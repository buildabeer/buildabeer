import { Injectable } from '@angular/core';
import { IStyle } from './style';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class StyleService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  getStyles(): Observable<IStyle[]> {
    return this._angularTokenService.get("styles")
      .map((response: Response) => <IStyle[]>response.json())
      .catch(this.handleError);
  }

  getWaterProfiles(): Observable<any[]> {
    return this._angularTokenService.get("water_profiles")
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getStyleById(styleId: number): Observable<IStyle> {
    return this._angularTokenService.get("styles/" + styleId)
      .map((response: Response) => <IStyle>response.json())
      .catch(this.handleError);
  }

  createStyle(style: IStyle): any {
    return this._angularTokenService.post("styles/", {style})
  }

  editStyle(styleId: number, style: IStyle): any {
    return this._angularTokenService.put("styles/" + styleId, {style})
  }

  deleteStyle(styleId: number): any {
    return this._angularTokenService.delete("styles/" + styleId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
