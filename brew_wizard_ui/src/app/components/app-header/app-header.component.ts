import { AuthService } from '../../user/auth.service';
import { AngularTokenService } from 'angular-token';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  headerSignIn = {
    login: '',
    password: ''
  };
  navbarCollapsed: boolean;

  signInErrors: string[] = [];

  constructor(private _title: Title, public _authService: AuthService, private _router: Router,
    public _authTokenService: AngularTokenService) {
    this._title.setTitle('My Homebrew Recipes');
  }

  ngOnInit() {
  }

  logOut() {
    this._authService.logOutUser().subscribe(() => this._router.navigate(['']));
  }

  onSignInSubmit() {
    this._authService.loginUser(this.headerSignIn)
      .subscribe((res) => {
        this.headerSignIn = {
          login: '',
          password: ''
        };
      },
      err => {
        this.headerSignIn = {
          login: '',
          password: ''
        };
        this.signInErrors = err.errors;
      });
  }
}
