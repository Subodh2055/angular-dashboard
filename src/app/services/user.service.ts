import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import {SharedService} from "../shared/shared.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  public getAllUsers(showMessage?: boolean): Observable<UserModel[]> {
    const api = `${this.API_URL}/users`;
    console.log(`[UserService] Fetching all users from: ${api}`);

    return this.http.get<any[]>(api).pipe(
      delay(500),
      map(res => {
        console.warn('Response:', res);
        if (showMessage) {
          this.sharedService.getHttpSuccessResponseMessage(res);
        }
        return res.map(user => new UserModel(user));
      }),
      catchError(error => {
        console.warn('Error fetching users:', error);
        this.sharedService.getServerErrorMessage(error);
        return throwError(() => error);
      })
    );
  }

  public getByUserId(id: number, showMessage?: boolean): Observable<UserModel> {
    const api = `${this.API_URL}/users/${id}`;
    console.log(`[UserService] Fetching user with ID: ${id}`);

    return this.http.get<any>(api).pipe(
      delay(300),
      map(res => {
        console.warn('Response:', res);
        if (showMessage) {
          this.sharedService.getHttpSuccessResponseMessage(res);
        }
        return new UserModel(res);
      }),
      catchError(error => {
        console.warn(`Error fetching user ID ${id}:`, error);
        this.sharedService.getServerErrorMessage(error);
        return throwError(() => error);
      })
    );
  }
}
