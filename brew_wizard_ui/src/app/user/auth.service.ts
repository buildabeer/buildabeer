import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { IUserData } from './user-data';
import { IMeasurementSetting } from './measurement-setting';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  userSignedIn$: Subject<boolean> = new Subject();

  constructor(
    private _authService: AngularTokenService,
    private http: HttpClient
    ) {
    this._authService.validateToken().subscribe(
      res => res.status === 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    );
  }

  updateUserInfo(user: { contact: boolean, recipe_reminders: boolean }): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/users/` + this._authService.currentUserData.id, {user});
  }

  logOutUser(): Observable<Response> {
    return this._authService.signOut().map(
      res => {
        this.userSignedIn$.next(false);
        return res;
      }
    );
  }

  registerUser(signUpData: {login: string, nickname: string, password: string, passwordConfirmation: string}): Observable<Response> {
    return this._authService.registerAccount(signUpData).map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      }
    );
  }

  resetPassword(login: {login: string}): Observable<Response> {
    return this._authService.resetPassword(login).map(
      res => {
        return res;
      }
    );
  }

  updatePassword(request: {password: string, passwordConfirmation: string,
    passwordCurrent: any, resetPasswordToken: string}): Observable<Response> {

    return this._authService.updatePassword(request).map(
      res => {
        return res;
      }
    );
  }

  loginUser(signInData: {login: string, password: string}): Observable<Response> {
    return this._authService.signIn(signInData).map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      }
    );
  }

  isAdmin(): boolean {
    return (this.userSignedIn$ &&
      this._authService.currentUserData &&
      (<IUserData>this._authService.currentUserData).admin);
  }

  currentUserMatchOrGlobal(userId: number): boolean {
    return (this.userSignedIn$ &&
      this._authService.currentUserData &&
      (this._authService.currentUserData.id === userId ||
      (<IUserData>this._authService.currentUserData).admin));
  }

  userSignedIn(): boolean {
    return this._authService.userSignedIn();
  }

  getSettings(): Observable<IMeasurementSetting> {
    return this.http.get(`${environment.token_auth_config.apiBase}/measurement_settings/`)
      .map((response: IMeasurementSetting) => response)
      .catch(this.handleError);
  }

  editSettings(measurement_setting: IMeasurementSetting): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/measurement_settings/`, {measurement_setting});
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }

  getEvents(start: Date, end: Date) {
    return this.http.get(`${environment.token_auth_config.apiBase}/calendar_events?start=" + start.toString()+"&end=` + end.toString())
      .map((response: any[]) => response)
      .catch(this.handleError);
  }
}
