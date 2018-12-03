import { Injectable } from '@angular/core';
import { IEquipment } from './equipment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getEquipments(): Observable<IEquipment[]> {
    return this.http.get("equipment")
      .map((response: Response) => <IEquipment[]>response.json())
      .catch(this.handleError);
  }

  getEquipment(equipmentId: number): Observable<IEquipment> {
    return this.http.get("equipment/" + equipmentId)
      .map((response: Response) => <IEquipment>response.json())
      .catch(this.handleError);
  }

  createEquipment(equipment: IEquipment): any {
    return this.http.post("equipment/", {equipment})
  }

  editEquipment(equipmentId: number, equipment: IEquipment): any {
    return this.http.put("equipment/" + equipmentId, {equipment})
  }

  deleteEquipment(equipmentId: number): any {
    return this.http.delete("equipment/" + equipmentId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
