import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {NgForOf, NgIf} from '@angular/common';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgbPagination,
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new BehaviorSubject<string>('');

  users: UserModel[] = [];
  filteredUsers: UserModel[] = [];
  paginatedUsers: UserModel[] = [];

  currentPage = 1;
  pageSize = 5;
  totalUsers = 0;

  searchTerm = '';

  isTableView = true;
  loading = false;
  error = '';
  readonly Math = Math;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initializeFromURL();
    this.loadLayoutPreference();
    this.setupSearch();
    this.getUserList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize component state from URL parameters
   */
  private initializeFromURL(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
        this.searchSubject.next(this.searchTerm);
      }
      if (params['page']) {
        this.currentPage = +params['page'];
      }
    });
  }

  /**
   * Load layout preference from localStorage
   */
  private loadLayoutPreference(): void {
    const savedLayout = localStorage.getItem('userListLayout');
    this.isTableView = savedLayout === 'false' ? false : true;
  }

  /**
   * Save layout preference to localStorage
   */
  saveLayoutPreference(): void {
    localStorage.setItem('userListLayout', this.isTableView.toString());
  }

  /**
   * Setup search with debouncing
   */
  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.filterUsers(searchTerm);
      this.updateURL();
    });
  }

  /**
   * Fetch users from API
   */
  getUserList(): void {
    this.loading = true;
    this.error = '';

    this.userService.getAllUsers().subscribe({
      next: (response: UserModel[]) => {
        console.log('Users loaded:', response);
        this.users = response;
        this.filterUsers(this.searchTerm);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
        console.error('Error fetching users:', err);
      },
      complete: () => {
        console.log('User loading completed');
      }
    });
  }

  /**
   * Handle search input
   */
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(this.searchTerm);
  }

  /**
   * Filter users based on search term
   */
  private filterUsers(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredUsers = [...this.users];
    } else {
      const term = searchTerm.toLowerCase().trim();
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    this.totalUsers = this.filteredUsers.length;
    this.currentPage = 1; // Reset to first page when filtering
    this.updatePagination();
  }

  /**
   * Update pagination based on current page and filtered results
   */
  private updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  /**
   * Handle page change event
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
    this.updateURL();
  }

  /**
   * Navigate to user detail page
   */
  viewUserDetail(userId: number): void {
    const queryParams = this.searchTerm ? {search: this.searchTerm} : {};
    this.router.navigate(['/user', userId], {queryParams});
  }

  /**
   * Update URL with current search and pagination state
   */
  private updateURL(): void {
    const queryParams: any = {};

    if (this.searchTerm) {
      queryParams.search = this.searchTerm;
    }

    if (this.currentPage > 1) {
      queryParams.page = this.currentPage;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Get total number of pages
   */
  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize);
  }

  /**
   * Retry loading users after error
   */
  retry(): void {
    this.getUserList();
  }
}
