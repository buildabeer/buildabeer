import { Injectable } from '@angular/core';
import { IEquipment } from './equipment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getEquipments(): Observable<IEquipment[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/equipment`)
      .map((response: IEquipment[]) => response)
      .catch(this.handleError);
  }

  getEquipment(equipmentId: number): Observable<IEquipment> {
    return this.http.get(`${environment.token_auth_config.apiBase}/equipment/` + equipmentId)
      .map((response: IEquipment) => response)
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
