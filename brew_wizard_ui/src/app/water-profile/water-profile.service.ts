import { Injectable } from '@angular/core';
import { IWaterProfile } from './water-profile';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class WaterProfileService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  getStyleWaterProfiles(): Observable<any[]> {
    return this._angularTokenService.get("water_profiles")
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getStyleWaterProfile(profileId: number): Observable<any> {
    return this._angularTokenService.get("water_profiles/" + profileId)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  getWaterProfiles(): Observable<IWaterProfile[]> {
    return this._angularTokenService.get("waters")
      .map((response: Response) => <IWaterProfile[]>response.json())
      .catch(this.handleError);
  }

  getWaterProfile(profileId: number): Observable<IWaterProfile> {
    return this._angularTokenService.get("waters/" + profileId)
      .map((response: Response) => <IWaterProfile>response.json())
      .catch(this.handleError);
  }

  createWaterProfile(water: IWaterProfile): any {
    return this._angularTokenService.post("waters/", {water})
  }

  editWaterProfile(water: IWaterProfile): any {
    return this._angularTokenService.put("waters/" + water.id, {water})
  }

  deleteWaterProfile(profileId: number): any {
    return this._angularTokenService.delete("waters/" + profileId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
