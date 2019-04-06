import { AuthService } from '../../user/auth.service';
import { AngularTokenService } from 'angular-token';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from './../../static-pages/contact-us/contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  headerBugReport = {
    title: 'Bug Report',
    message: ''
  };

  headerSignIn = {
    login: '',
    password: ''
  };
  navbarCollapsed: boolean;

  signInErrors: string[] = [];

  constructor(private _title: Title, public _authService: AuthService, private _router: Router,
    public _authTokenService: AngularTokenService, public _modalService: NgbModal,
    private _contactService: ContactService) {
    this._title.setTitle('My Homebrew Recipes');
  }

  ngOnInit() {
  }

  sendContact(contact) {
    this._contactService.sendContact(contact)
      .subscribe((res) => {
        if (res.status === 201) {
          this.headerBugReport = {
            title: 'Bug Report',
            message: ''
          };
          window.alert('Message sent.');
        }
      },
      err => {
        window.alert('Ironically, there was an error sending your message.' +
          ' Please feel free to yell at us on github.com/buildabeer/buildabeer');
      });
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
