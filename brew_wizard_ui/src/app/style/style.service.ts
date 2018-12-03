import { Injectable } from '@angular/core';
import { IStyle } from './style';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class StyleService {

  constructor(private http: HttpClient) { }

  getStyles(): Observable<IStyle[]> {
    return this.http.get("styles")
      .map((response: Response) => <IStyle[]>response.json())
      .catch(this.handleError);
  }

  getWaterProfiles(): Observable<any[]> {
    return this.http.get("water_profiles")
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getStyleById(styleId: number): Observable<IStyle> {
    return this.http.get("styles/" + styleId)
      .map((response: Response) => <IStyle>response.json())
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
