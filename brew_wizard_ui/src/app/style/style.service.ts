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

  getStyleNames(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/styles/names`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getStyleYeastRelations(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/style_yeast_relations`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  deleteStyleYeastRelation(first_id, second_id): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/style_yeast_relations/` + first_id + '-' + second_id);
  }

  createStyleYeastRelation(style_yeast_relation: any): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/style_yeast_relations/`, { style_yeast_relation });
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
    return this.http.post(`${environment.token_auth_config.apiBase}/styles/`, {style});
  }

  editStyle(styleId: number, style: IStyle): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/styles/` + styleId, {style});
  }

  deleteStyle(styleId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/styles/` + styleId);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
