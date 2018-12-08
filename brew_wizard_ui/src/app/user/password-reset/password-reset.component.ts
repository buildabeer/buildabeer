import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  resetUser: string;

  client_id: string;
  expiry: string;
  reset_password: boolean;
  uid: string;

  reset = {
    password: '',
    passwordConfirmation: '',
    passwordCurrent: null,
    resetPasswordToken: ''
  };


  resetErrors: string[] = [];

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.client_id = params['client_id'];
      this.expiry = params['expiry'];
      this.reset_password = params['reset_password'];
      this.reset.resetPasswordToken = params['token'];
      this.uid = params['uid'];
    });
  }

  onResetSubmit() {
    this._authService.resetPassword({
      login: this.resetUser
    }).subscribe ((res) => {
        if (res.status === 200) {
          this._router.navigate(['']);
          window.alert('Password reset email sent. Please be patient, it is on it\'s way!');
        }
      },
      (err) => {
        this.resetUser = '';
        this.resetErrors = err.errors[0];
      }
    );
  }

  onResetConfirmSubmit() {
    this._authService.updatePassword(this.reset)
      .subscribe ((res) => {
        if (res.status === 200) {
          this._router.navigate(['login']);
          window.alert('Password reset!');
        }
      },
      (err) => {
        this.reset.password = '';
        this.reset.passwordConfirmation = '';
        this.resetErrors = err.errors[0];
      }
    );
  }
}
