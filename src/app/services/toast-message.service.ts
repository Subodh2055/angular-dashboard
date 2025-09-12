import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, Observable} from "rxjs";
import {Alert, AlertType} from "../models/alert";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  CustomProgressAnimationType: any = 'decreasing';
  subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  toast$: Observable<any>;

  constructor(private toastrService: ToastrService) {
    this.subject = new BehaviorSubject<any>(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  public showToastMessage(alert: Alert, message: string) {
    this.show();
    const msgAlert = {msg:message,alertType:alert.type};
    this.subject.next(msgAlert);
    let alertStatus = this.getStatus(alert.type);
    const options = {
      timeOut: 3000,
      easeTime: 500,
      progressBar: true,
      progressAnimation: this.CustomProgressAnimationType,
      positionClass: 'toast-bottom-right',
      closeButton: false,
      preventDuplicates: true,
    };
    console.warn(alertStatus, message);
    switch (alertStatus) {
      case AlertType.ERROR:
        this.toastrService.error(message, AlertType.ERROR, options);
        break;
      case AlertType.SUCCESS:
        this.toastrService.success(message, AlertType.SUCCESS, options);
        break;
      case AlertType.INFO:
        this.toastrService.info(message, AlertType.INFO, options);
        break;
      case AlertType.WARNING:
        this.toastrService.warning(message, AlertType.WARNING, options);
        break;
    }
  }

  private getStatus(type: AlertType) {
    switch (type) {
      case AlertType.ERROR:
        return AlertType.ERROR;
      case AlertType.SUCCESS:
        return AlertType.SUCCESS;
      case AlertType.WARNING:
        return AlertType.WARNING;
      case AlertType.INFO:
        return AlertType.INFO;
      default:
        return 'primary';
    }
  }
  show() {
    this.subject.next({ });
  }
}
