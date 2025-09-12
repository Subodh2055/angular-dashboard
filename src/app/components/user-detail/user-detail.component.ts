import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonObservableService } from '../../shared/common-observable.service';
import { ToastMessageService } from '../../services/toast-message.service';
import { Alert, AlertType } from '../../models/alert';
import { UserModel } from "../../models/user.model";
import {LoadingSpinnerComponent} from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: UserModel | null = null;
  loading = false; // loader flag

  constructor(
    private userService: UserService,
    private commonObservableService: CommonObservableService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastMessageService: ToastMessageService,

  ) {}

  ngOnInit(): void {
    this.loadRouteParams();
    this.loadQueryParams();
  }

  private loadRouteParams(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const id = paramMap.get('id');
        if (id) this.getUserByUserId(id);
      },
      error: (err: any) => {
        this.toastMessageService.showToastMessage(
          new Alert(AlertType.ERROR),
          err?.error?.message || 'Failed to read route params'
        );
        console.error(err?.error);
      }
    });
  }

  private loadQueryParams(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        console.log('Query Params:', queryParams);
      },
      error: (err: any) => {
        this.toastMessageService.showToastMessage(
          new Alert(AlertType.ERROR),
          err?.error?.message || 'Failed to read query params'
        );
        console.error(err?.error);
      }
    });
  }

  getUserByUserId(userId: string | number): void {
    this.loading = true; // start loader
    this.userService.getByUserId(Number(userId)).subscribe({
      next: (res: any) => {
        this.user = res;
        this.toastMessageService.showToastMessage(
          new Alert(AlertType.SUCCESS),
          `User fetched successfully by ID: ${userId}`
        );
        console.log('User:', res);
      },
      error: (err: any) => {
        this.toastMessageService.showToastMessage(
          new Alert(AlertType.ERROR),
          err?.error?.message || 'Failed to fetch user'
        );
        console.error(err?.error);
      },
      complete: () => {
        this.loading = false; // stop loader
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/users']);
  }
}
