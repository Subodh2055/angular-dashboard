import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgForOf, NgIf } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  imports: [
    NgbPagination,
    NgIf,
    NgForOf,
    FormsModule,
    PaginationComponent
  ],
  selector: 'app-user-list',
  standalone: true,
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html'
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
  ) {}

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

  // ----------------- URL & State -----------------
  private initializeFromURL(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.searchSubject.next(this.searchTerm);

      this.currentPage = params['page'] ? +params['page'] : 1;
      this.updatePagination();
    });
  }

  private loadLayoutPreference(): void {
    const savedLayout = localStorage.getItem('userListLayout');
    this.isTableView = savedLayout === 'false' ? false : true;
  }

  saveLayoutPreference(): void {
    localStorage.setItem('userListLayout', this.isTableView.toString());
  }

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

  // ----------------- API & Filtering -----------------
  getUserList(): void {
    this.loading = true;
    this.error = '';

    this.userService.getAllUsers().subscribe({
      next: (response: UserModel[]) => {
        this.users = response;
        this.filterUsers(this.searchTerm);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
        console.error('Error fetching users:', err);
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(this.searchTerm);
  }

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
    if (this.currentPage > this.totalPages) this.currentPage = 1;
    this.updatePagination();
  }

  private updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
    this.updateURL();
  }

  private updateURL(): void {
    const queryParams: any = {};
    if (this.searchTerm) queryParams.search = this.searchTerm;
    queryParams.page = this.currentPage; // always include page

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  viewUserDetail(userId: number): void {
    const queryParams = this.searchTerm ? { search: this.searchTerm } : {};
    this.router.navigate(['/user', userId], { queryParams });
  }

  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize);
  }

  retry(): void {
    this.getUserList();
  }
}
