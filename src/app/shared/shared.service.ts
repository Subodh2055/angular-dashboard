import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ObjectUtil} from "./utill/object-util";
import {ToastMessageService} from "../services/toast-message.service";
import {Alert, AlertType} from "../models/alert";
import {LocalStorage, LocalStorageUtil} from "./utill/local-storage-util";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // storage: LocalStorage = LocalStorageUtil.getStorage();

  constructor(
    private router: Router,
    private toastMessage: ToastMessageService
  ) {
  }
  public getServerErrorMessage(error: any) {
    console.warn(error?.code);
    console.warn(error);
    switch (error?.error?.code) {
      case 400:

        if (error?.error?.errors?.length > 0) {
          let errorMsg = '';
          error?.error?.errors?.forEach((e: any) => {
            errorMsg = errorMsg + ' ' + (ObjectUtil.isEmpty(e?.message) ? (e?.field + ' cannot be null') : e?.message) + ' ';
          })

          this.toastMessage.showToastMessage(
            new Alert(AlertType.ERROR),
            errorMsg
          );
        } else {
          this.toastMessage.showToastMessage(
            new Alert(AlertType.ERROR),
            error?.error?.message
          );
        }
        console.error(`Bad  Request: ${error?.error?.message}`);
        break;
      case 401:
        this.toastMessage.showToastMessage(
          new Alert(AlertType.ERROR),
          error?.message
        );
        console.error(`Unauthorized: ${error?.message}`);
        break;
      case 404:
        this.toastMessage.showToastMessage(
          new Alert(AlertType.ERROR),
          error?.message
        );
        console.error(`Not Found: ${error?.message}`);
        break;
      case 403:
        this.toastMessage.showToastMessage(
          new Alert(AlertType.ERROR),
          error?.message
        );
        console.error(`Access Denied: ${error?.message}`);
        break;
      case 500:
        this.toastMessage.showToastMessage(
          new Alert(AlertType.ERROR),
          error?.message
        );
        console.error(`Internal Server Error: ${error?.message}`);
        break;
      default:
        this.toastMessage.showToastMessage(
          new Alert(AlertType.ERROR),
          error?.message ? `${error?.message}` : 'Something went wrong. Unknown Server Error'
        );
        console.error(
          `Something went wrong. Unknown Server Error: ${error?.message}`
        );
        break;
    }
  }

  getHttpSuccessResponseMessage(response: any) {
    console.warn('response: ', response);
    switch (response.code) {
      case 200:
        this.toastMessage.showToastMessage(
          new Alert(AlertType.INFO),
          response.message
        );
        console.warn(`Response fetched: ${response.message}`);
        break;
      case 201:
        this.toastMessage.showToastMessage(
          new Alert(AlertType.SUCCESS),
          response.message
        );
        console.warn(`Data saved: ${response.message}`);
        break;
      case 204:
        this.toastMessage.showToastMessage(
          new Alert(AlertType.INFO),
          response.message
        );
        console.warn(`Data saved: ${response.message}`);
        break;
      default:
        console.warn('');
        break;
    }
  }
}
