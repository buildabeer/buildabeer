import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ContactService } from './contact.service';


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

  constructor(private _contactService: ContactService) { }

  ngOnInit() {
  }

  contactSubmit(): void {
    this._contactService.sendContact(this.contact)
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
}
