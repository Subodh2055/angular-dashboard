import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import {ToastMessageService} from "../../services/toast-message.service";
import {Alert, AlertType} from "../../models/alert";
import {LocalStorage, LocalStorageUtil} from "../../shared/utill/local-storage-util";
import {CommonObservableService} from "../../shared/common-observable.service";
import {LoadingSpinnerComponent} from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    PaginationComponent,
    LoadingSpinnerComponent
  ],
  selector: 'app-user-list',
  standalone: true,
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserModel[] = [];
  filteredUsers: UserModel[] = [];
  paginatedUsers: UserModel[] = [];
  currentPage = 1;
  pageSize = 5;
  totalUsers = 0;
  searchTerm = '';
  isTableView = true;
  loading = false;
  math = Math;

  public constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastMessageService: ToastMessageService,
    private commonObservableService: CommonObservableService
  ) {
  }

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.initializeFromURL();
    this.setupSearch();
    this.getUserList();
  }

  ngOnDestroy(): void {
    this.commonObservableService.destroy.next();
  }

  // ----------------- LocalStorage -----------------
  loadFromLocalStorage(): void {
    const storage: LocalStorage = LocalStorageUtil.getStorage();
    this.isTableView = storage.userListLayout ?? true;
    this.searchTerm = storage.searchTerm ?? '';
    this.currentPage = storage.currentPage ?? 1;

    this.commonObservableService.nextSearch(this.searchTerm);
  }

  saveToLocalStorage(): void {
    const storage = LocalStorageUtil.getStorage();
    storage.userListLayout = this.isTableView;
    storage.searchTerm = this.searchTerm;
    storage.currentPage = this.currentPage;
    LocalStorageUtil.setStorage(storage);
  }

  // ----------------- URL & State -----------------
  initializeFromURL(): void {
    this.route.queryParams
      .pipe(takeUntil(this.commonObservableService.destroy))
      .subscribe(params => {
        if (params['search']) {
          this.searchTerm = params['search'];
          this.commonObservableService.nextSearch(this.searchTerm);
        }
        if (params['page']) this.currentPage = +params['page'];
        this.updatePagination();
      });
  }

  saveLayoutPreference(): void {
    this.saveToLocalStorage();
  }

  setupSearch(): void {
    this.commonObservableService.getSearchObservable()
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.commonObservableService.destroy)
      )
      .subscribe({
        next: (searchTerm: string) => {
          this.searchTerm = searchTerm;
          this.filterUsers(searchTerm);
          this.updateURL();
          this.saveToLocalStorage();
        },
        error: (err: any) => {
          console.error('Error in search observable:', err);
        },
        complete: () => {
          console.log('Search observable completed');
        }
      });
  }


  getUserList(): void {
    this.loading = true;

    this.userService.getAllUsers().subscribe({
      next: (response: UserModel[]) => {
        this.users = response;
        this.filterUsers(this.searchTerm);
        this.loading = false;

        this.toastMessageService.showToastMessage(new Alert(AlertType.SUCCESS), 'Users loaded successfully');
      },
      error: (err: any) => {
        this.loading = false;

        this.toastMessageService.showToastMessage(
          new Alert(AlertType.ERROR), err?.error?.message || 'Failed to load users'
        );

        console.error('Error fetching users:', err);
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.commonObservableService.nextSearch(target.value);
  }

  filterUsers(searchTerm: string): void {
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

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
    this.updateURL();
    this.saveToLocalStorage();
  }

  updateURL(): void {
    const queryParams: any = {};
    if (this.searchTerm) queryParams.search = this.searchTerm;
    queryParams.page = this.currentPage;

    this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: 'merge'});
  }

  viewUserDetail(userId: number): void {
    const queryParams = this.searchTerm ? {search: this.searchTerm} : {};
    this.router.navigate(['/user', userId], {queryParams});
  }

  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize);
  }

}
