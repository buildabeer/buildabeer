import { Injectable } from '@angular/core';
import { IMiscellaneous } from './miscellaneous';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MiscellaneousService {

  constructor(private http: HttpClient) { }

  getMiscellanies(): Observable<IMiscellaneous[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/miscellaneous`)
      .map((response: IMiscellaneous[]) => response)
      .catch(this.handleError);
  }

  getMiscellaneous(miscellaneousId: number): Observable<IMiscellaneous> {
    return this.http.get(`${environment.token_auth_config.apiBase}/miscellaneous/` + miscellaneousId)
      .map((response: IMiscellaneous) => response)
      .catch(this.handleError);
  }

  getMiscellaneousNames(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/miscellaneous/names`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  createMiscellaneous(miscellaneou: IMiscellaneous): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/miscellaneous/`, {miscellaneou});
  }

  editMiscellaneous(miscellaneousId: number, miscellaneou: IMiscellaneous): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/miscellaneous/` + miscellaneousId, {miscellaneou});
  }

  deleteMiscellaneous(miscellaneousId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/miscellaneous/` + miscellaneousId);
  }

  getTypes(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/miscellaneous_types/`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/miscellaneous_types/` + typeId)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }

  calculateTime(minutes: number): { time: number, label: string } {
    if ( minutes >= 60 * 24 ) {
      return { time: minutes / 60 / 24, label: 'days' };
    } else if (minutes >= 60) {
      return { time: minutes / 60, label: 'hours' };
    }
    return { time: minutes, label: 'minutes' };
  }
}
