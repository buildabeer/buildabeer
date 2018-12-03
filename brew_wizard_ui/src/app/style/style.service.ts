import { Injectable } from '@angular/core';
import { IStyle } from './style';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StyleService {

  constructor(private http: HttpClient) { }

  getStyles(): Observable<IStyle[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/styles`)
      .map((response: IStyle[]) => response)
      .catch(this.handleError);
  }

  getWaterProfiles(): Observable<any[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/water_profiles`)
      .map((response: any[]) => response)
      .catch(this.handleError);
  }

  getStyleById(styleId: number): Observable<IStyle> {
    return this.http.get(`${environment.token_auth_config.apiBase}/styles/` + styleId)
      .map((response: IStyle) => response)
      .catch(this.handleError);
  }

  createStyle(style: IStyle): any {
    return this.http.post("styles/", {style})
  }

  editStyle(styleId: number, style: IStyle): any {
    return this.http.put("styles/" + styleId, {style})
  }

  deleteStyle(styleId: number): any {
    return this.http.delete("styles/" + styleId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
