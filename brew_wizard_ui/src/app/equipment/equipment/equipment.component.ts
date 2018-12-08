import { Component, OnInit } from '@angular/core';
import { IEquipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  equipment: IEquipment;
  errorMessage = 'Loading...';

  constructor(private _equipmentService: EquipmentService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const equipmentId: number = this._activatedRoute.snapshot.params['id'];
    this._equipmentService.getEquipment(equipmentId)
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 6) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000);
      })
      .subscribe((equipmentData) => {
        if (equipmentData === null) {
          this.errorMessage = 'Specified equipment was not found.';
        } else {

          this.equipment = equipmentData;
          this.errorMessage = '';
        }
      }, (error) => {
          if (error.status === 401) {
            this.errorMessage = 'You must log in first.';
          } else {
            this.errorMessage = 'Problem with the service. Please try against later.';
          }
          console.error(error);
      });
  }

  onBackButtonClick(): void {
    this._router.navigate(['/equipment']);
  }
}
