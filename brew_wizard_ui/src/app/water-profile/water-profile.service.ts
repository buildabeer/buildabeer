import { Injectable } from '@angular/core';
import { IWaterProfile } from './water-profile';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class WaterProfileService {

  constructor(private http: HttpClient) { }

  getStyleWaterProfiles(): Observable<any[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/water_profiles`)
      .map((response: any[]) => response)
      .catch(this.handleError);
  }

  getStyleWaterProfile(profileId: number): Observable<any> {
    return this.http.get(`${environment.token_auth_config.apiBase}/water_profiles/` + profileId)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getWaterProfiles(): Observable<IWaterProfile[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/waters`)
      .map((response: IWaterProfile[]) => response)
      .catch(this.handleError);
  }

  getWaterProfile(profileId: number): Observable<IWaterProfile> {
    return this.http.get(`${environment.token_auth_config.apiBase}/waters/` + profileId)
      .map((response: IWaterProfile) => response)
      .catch(this.handleError);
  }

  createWaterProfile(water: IWaterProfile): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/waters/`, {water});
  }

  editWaterProfile(water: IWaterProfile): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/waters/` + water.id, {water});
  }

  deleteWaterProfile(profileId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/waters/` + profileId);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
