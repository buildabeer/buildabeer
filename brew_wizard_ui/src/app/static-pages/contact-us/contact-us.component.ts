import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contact = {
    email: '',
    name: '',
    phone: '',
    title: '',
    message: ''
  };

  contactErrors: string[] = [];

  constructor(private _http: Http) { }

  ngOnInit() {
  }

  sendContact(): Observable<Response> {
    return this._http.post(environment.token_auth_config.apiBase + '/contact_us', this.contact)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  contactSubmit(): void {
    this.sendContact()
      .subscribe((res) => {
        if (res.status === 201) {
          this.contact = {
            email: '',
            name: '',
            phone: '',
            title: '',
            message: ''
          };
          window.alert('Message sent.');
        }
      },
      err => {
        this.contactErrors = err.errors;
      });
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
