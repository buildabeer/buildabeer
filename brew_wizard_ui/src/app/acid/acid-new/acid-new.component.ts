import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IAcid } from '../acid';
import { AcidService } from '../acid.service';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-acid-new',
  templateUrl: './acid-new.component.html',
  styleUrls: ['./acid-new.component.scss']
})
export class AcidNewComponent implements OnInit {

  newAcidItem: IAcid = {
        id: 0,
        name: '',
        strength: 0,
        quantity_for_normal: 0,
        molecular_weight: 0,
        density: 0,
        description: ''
      };

  @Output()
  uponAcidCreate = new EventEmitter();

  createModal: NgbModalRef;

  constructor(private _acidService: AcidService,
    public _authService: AuthService, private _router: Router,
    private _modalService: NgbModal) { }

  ngOnInit() {
  }

  creationSubmit(form: any): void {
    console.log(this.newAcidItem);
    this._acidService.createAcid(this.newAcidItem)
      .subscribe((res) => {
        this.newAcidItem.id = res.id;
        this.uponAcidCreate.emit({acid: this.newAcidItem});
        this.createModal.close();

        this.newAcidItem = {
            id: 0,
            name: '',
            strength: 0,
            quantity_for_normal: 0,
            molecular_weight: 0,
            density: 0,
            description: ''
          };
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error adding the acid acid, please try again later.');
        }
        console.error(error);
      });
  }

  open(newAcid) {
    this.createModal = this._modalService.open(newAcid, { size: 'lg' });
  }
}
