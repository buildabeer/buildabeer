import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEquipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {

  equipmentTypes: string[] = ['All Grain', 'Extract', 'Brew in a Bag'];
  equipment_type: string = this.equipmentTypes[0];
  errorMessage = 'Loading...';

  @Input()
  originalEquipmentItem: IEquipment;

  editEquipmentItem: IEquipment;

  @Output()
  uponEquipmentEdit = new EventEmitter();

  editModal: NgbModalRef;

  constructor(private _router: Router, private _equipmentService:
    EquipmentService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService) { }

  ngOnInit() { }

  editSubmit(form: any): void {
    if (this.equipment_type !== 'All Grain') {
      this.editEquipmentItem.fly_sparge = false;
      this.editEquipmentItem.batch_sparge = false;
      this.editEquipmentItem.wl_hlt = 0;
      this.editEquipmentItem.wl_mash = 0;
    }

    this._equipmentService.editEquipment(this.editEquipmentItem.id, this.editEquipmentItem)
      .subscribe((res) => {
        this.uponEquipmentEdit.emit({equipment: this.editEquipmentItem});
        this.editModal.close();
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error processing your request, please try again later.');
        }
        console.error(error);
      });
  }

  open(editEquipment) {
    this.editEquipmentItem = Object.assign({}, this.originalEquipmentItem);
    this.editModal = this._modalService.open(editEquipment, { size: 'lg' });
  }
}
