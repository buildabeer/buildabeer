import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMalt } from '../malt';
import { MaltService } from '../malt.service';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-malt-new',
  templateUrl: './malt-new.component.html',
  styleUrls: ['./malt-new.component.scss']
})
export class MaltNewComponent implements OnInit {

  newMaltItem: IMalt = {
        id: 0,
        user_id: 0,
        name: "",
        global: false,
        malt_type_id: 1,
        origin: "",
        color: 0,
        malt_yield: 70,
        diastatic_power: 0,
        protein: 0,
        must_mash: true,
        max_percent: 100,
        description: "",
        recipe_count: 0
      };
  maltTypes: string[] = [];

  @Output()
  onMaltCreate = new EventEmitter();

  createModal: NgbModalRef;

  constructor(private _maltService: MaltService,
    public _authService: AuthService, private _router: Router,
    private _modalService: NgbModal) { }

  ngOnInit() {

    this._maltService.getTypes()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if(retryCount < 3) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000)
      })
      .subscribe(maltTypeData => {
          this.maltTypes = maltTypeData;
          if(this.maltTypes.length === 0) {
            window.alert("No malt types found.");
          }
        },
        error => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("Problem with the service. Please try against later.");
          }
          console.error(error);
      });
  }

  creationSubmit(form: any): void {
    this._maltService.createMalt(this.newMaltItem)
      .subscribe((res) => {
        this.newMaltItem.id = JSON.parse(res._body).id;
        this.newMaltItem.user_id = JSON.parse(res._body).user_id;
        this.onMaltCreate.emit({malt: this.newMaltItem});
        this.createModal.close();

        this.newMaltItem = {
            id: 0,
            user_id: 0,
            name: "",
            global: false,
            malt_type_id: 1,
            origin: "",
            color: 0,
            malt_yield: 70,
            diastatic_power: 0,
            protein: 0,
            must_mash: true,
            max_percent: 100,
            description: "",
            recipe_count: 0
        };
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error adding the malt, please try again later.");
        }
        console.error(error);
      });
  }

  open(newMalt) {
    this.createModal = this._modalService.open(newMalt, { size: 'lg' });
  }
}
