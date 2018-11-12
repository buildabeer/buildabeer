import { AuthService } from "../../user/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEquipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent implements OnInit {

  isCollapsed: boolean = true;

  @Input()
  equipment: IEquipment;

  @Output()
  onEquipmentDelete = new EventEmitter();

  @Output()
  onEquipmentEdit = new EventEmitter();

  constructor(private _equipmentService: EquipmentService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/equipment')
  }

  deleteCard(): void {
    var recipe_message: string = this.equipment.recipe_count > 0 ? "This equipment is used " + this.equipment.recipe_count + " times, are you sure you want to delete it?" : "Are you sure you want to delete this equipment?"
    if (window.confirm(recipe_message)) {
      this._equipmentService.deleteEquipment(this.equipment.id)
        .subscribe((res) => {
          if(this._router.url !== '/equipment') {
            this._router.navigate(['/equipment'])
          } else {
            this.onEquipmentDelete.emit({equipment: this.equipment});
          }
        }, (error) => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("There was an error deleting the equipment equipment, please try again later.");
          }
          console.error(error);
        })
    }
  }

  editEvent(event): void {
    this.equipment = event.equipment;
    this.onEquipmentEdit.emit({equipment: this.equipment});
  }
}
