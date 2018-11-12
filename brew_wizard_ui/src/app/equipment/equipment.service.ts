import { Injectable } from '@angular/core';
import { IEquipment } from './equipment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class EquipmentService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  getEquipments(): Observable<IEquipment[]> {
    return this._angularTokenService.get("equipment")
      .map((response: Response) => <IEquipment[]>response.json())
      .catch(this.handleError);
  }

  getEquipment(equipmentId: number): Observable<IEquipment> {
    return this._angularTokenService.get("equipment/" + equipmentId)
      .map((response: Response) => <IEquipment>response.json())
      .catch(this.handleError);
  }

  createEquipment(equipment: IEquipment): any {
    return this._angularTokenService.post("equipment/", {equipment})
  }

  editEquipment(equipmentId: number, equipment: IEquipment): any {
    return this._angularTokenService.put("equipment/" + equipmentId, {equipment})
  }

  deleteEquipment(equipmentId: number): any {
    return this._angularTokenService.delete("equipment/" + equipmentId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
