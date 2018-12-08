import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInUser = {
    login: '',
    password: ''
  };

  signInErrors: string[] = [];

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  onSignInSubmit() {
    this._authService.loginUser(this.signInUser)
      .subscribe((res) => {
        if (res.status === 200) {
          this._router.navigate(['']);
        }
      },
      err => {
        this.signInUser = {
          login: '',
          password: ''
        };
        this.signInErrors = err.errors;
      });
  }
}
