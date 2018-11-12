import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IEquipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import * as $ from 'jquery'

@Component({
  selector: 'app-equipment-new',
  templateUrl: './equipment-new.component.html',
  styleUrls: ['./equipment-new.component.scss']
})
export class EquipmentNewComponent implements OnInit {

  newEquipmentItem: IEquipment = {
        id: 0,
        user_id: 0,
        name: "",
        global: false,
        fly_sparge: false,
        batch_sparge: true,
        wl_hlt: .25,
        wl_mash: .25,
        wl_boil: .25,
        boil_rate: 1.5,
        efficiency: 72,
        batch_limit: 10,
        whirlpool: false,
        hop_back: false,
        recipe_count: 0
      };

  equipmentTypes: string[] = ["All Grain", "Extract", "Brew in a Bag"];
  equipment_type: string = this.equipmentTypes[0]

  @Output()
  onEquipmentCreate = new EventEmitter();

  createModal: NgbModalRef;

  constructor(private _equipmentService: EquipmentService,
    public _authService: AuthService, private _router: Router,
    private _modalService: NgbModal) { }

  ngOnInit() { }

  creationSubmit(form: any): void {
    if(this.equipment_type !== "All Grain") {
      this.newEquipmentItem.fly_sparge = false;
      this.newEquipmentItem.batch_sparge = false;
      this.newEquipmentItem.wl_hlt = 0;
      this.newEquipmentItem.wl_mash = 0;
    }

    this._equipmentService.createEquipment(this.newEquipmentItem)
      .subscribe((res) => {
        this.newEquipmentItem.id = JSON.parse(res._body).id;
        this.newEquipmentItem.user_id = JSON.parse(res._body).user_id;
        this.onEquipmentCreate.emit({equipment: this.newEquipmentItem});
        this.createModal.close();

        this.newEquipmentItem = {
          id: 0,
          user_id: 0,
          name: "",
          global: false,
          fly_sparge: false,
          batch_sparge: true,
          wl_hlt: .25,
          wl_mash: .25,
          wl_boil: .25,
          boil_rate: 1.5,
          efficiency: 72,
          batch_limit: 10,
          whirlpool: false,
          hop_back: false,
          recipe_count: 0
        };
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error adding the equipment, please try again later.");
        }
        console.error(error);
      });
  }

  open(newEquipment) {
    this.createModal = this._modalService.open(newEquipment, { size: 'lg' });
  }
}
