import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from './../../static-pages/contact-us/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {

  headerBugReport = {
    title: 'Bug Report',
    message: ''
  };

  constructor(
    public _modalService: NgbModal,
    private _contactService: ContactService) {

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
        window.alert('Ironically, there was an error sending your message. Please feel free to yell at us on github.com/buildabeer/buildabeer');
      });
  }
  
}
