import { AuthService } from '../../user/auth.service';
import { Angular2TokenService } from 'angular2-token'
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  headerSignIn = {
    email: '',
    password: ''
  }
  navbarCollapsed: boolean;

  signInErrors: string[] = [];

  constructor(private _title: Title, public _authService: AuthService, private _router: Router,
    public _authTokenService: Angular2TokenService) {
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
        if (res.status == 200) {
          this.headerSignIn = {
            email: '',
            password: ''
          }
          if (this._router.url !== '/recipes/new') {
            window.location.reload();
          }
        }
      },
      err => {
        this.headerSignIn = {
          email: '',
          password: ''
        }
        this.signInErrors = err.json().errors;
      })
  }
}
