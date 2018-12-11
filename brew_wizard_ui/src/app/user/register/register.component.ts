import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpUser = {
    login: '',
    nickname: '',
    password: '',
    passwordConfirmation: ''
  };

  account_confirmation_success = false;

  signUpErrors = '';

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['account_confirmation_success']) {
        this._router.navigate(['login']);
      }
    });
  }

  onSignUpSubmit() {
    this._authService.registerUser(this.signUpUser)
      .subscribe ((res) => {
        window.alert('A confirmation email has been sent. Please check your spam if you do not see it after a few minutes.');
        this._router.navigate(['']);
      },
      (err) => {
        this.signUpUser.password = '';
        this.signUpUser.passwordConfirmation = '';
        this.signUpErrors = err.error.errors.full_messages;
      }
    );
  }
}
