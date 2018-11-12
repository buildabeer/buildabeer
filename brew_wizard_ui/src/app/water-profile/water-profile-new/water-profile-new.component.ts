import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWaterProfile } from '../water-profile';
import { WaterProfileService } from '../water-profile.service';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-water-profile-new',
  templateUrl: './water-profile-new.component.html',
  styleUrls: ['./water-profile-new.component.scss']
})
export class WaterProfileNewComponent implements OnInit {

  newWaterProfile: IWaterProfile = {
        id: 0,
        user_id: 0,
        name: "",
        ph: 7,
        calcium: 0,
        magnesium: 0,
        sodium: 0,
        sulfate: 0,
        chloride: 0,
        bicarbonate: 0,
        description: "",
        global: false,
        recipe_count: 0
      };

  @Output()
  onWaterCreate = new EventEmitter();

  createModal: NgbModalRef;

  constructor(private _waterProfileService: WaterProfileService,
    public _authService: AuthService, private _router: Router,
    private _modalService: NgbModal) { }

  ngOnInit() {
  }

  creationSubmit(form: any): void {
    this._waterProfileService.createWaterProfile(this.newWaterProfile)
      .subscribe((res) => {
        this.newWaterProfile.id = JSON.parse(res._body).id;
        this.newWaterProfile.user_id = JSON.parse(res._body).user_id;
        this.onWaterCreate.emit({waterProfile: this.newWaterProfile});
        this.createModal.close();

        this.newWaterProfile = {
            id: 0,
            user_id: 0,
            name: "",
            ph: 7,
            calcium: 0,
            magnesium: 0,
            sodium: 0,
            sulfate: 0,
            chloride: 0,
            bicarbonate: 0,
            description: "",
            global: false,
            recipe_count: 0
          };
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error adding the water profile, please try again later.");
        }
        console.error(error);
      });
  }

  open(newWater) {
    this.createModal = this._modalService.open(newWater, { size: 'lg' });
  }
}
