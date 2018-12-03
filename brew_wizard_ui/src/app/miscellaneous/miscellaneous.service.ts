import { Injectable } from '@angular/core';
import { IMiscellaneous } from './miscellaneous';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class MiscellaneousService {

  constructor(private http: HttpClient) { }

  getMiscellanies(): Observable<IMiscellaneous[]> {
    return this.http.get("miscellaneous")
      .map((response: Response) => <IMiscellaneous[]>response.json())
      .catch(this.handleError);
  }

  getMiscellaneous(miscellaneousId: number): Observable<IMiscellaneous> {
    return this.http.get("miscellaneous/" + miscellaneousId)
      .map((response: Response) => <IMiscellaneous>response.json())
      .catch(this.handleError);
  }

  createMiscellaneous(miscellaneou: IMiscellaneous): any {
    return this.http.post("miscellaneous/", {miscellaneou})
  }

  editMiscellaneous(miscellaneousId: number, miscellaneou: IMiscellaneous): any {
    return this.http.put("miscellaneous/" + miscellaneousId, {miscellaneou})
  }

  deleteMiscellaneous(miscellaneousId: number): any {
    return this.http.delete("miscellaneous/" + miscellaneousId)
  }

  getTypes(): any {
    return this.http.get("miscellaneous_types/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this.http.get("miscellaneous_types/" + typeId)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }

  calculateTime(minutes: number): { time: number, label: string } {
    if ( minutes >= 60 * 24 ) {
      return { time: minutes / 60 / 24, label: "days" }
    } else if (minutes >= 60) {
      return { time: minutes / 60, label: "hours" }
    }
    return { time: minutes, label: "minutes" }
  }
}
