import { Injectable } from '@angular/core';
import { IYeast } from './yeast';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Response } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class YeastService {

  constructor(private http: HttpClient) { }

  getYeasts(): Observable<IYeast[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/yeasts`)
      .map((response: IYeast[]) => response)
      .catch(this.handleError);
  }

  getYeast(yeastId: number): Observable<IYeast> {
    return this.http.get(`${environment.token_auth_config.apiBase}/yeasts/` + yeastId)
      .map((response: IYeast) => response)
      .catch(this.handleError);
  }

  getYeastNames(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/yeasts/names`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getYeastRelations(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/yeast_relations`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  deleteYeastRelation(first_id, second_id): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/yeast_relations/` + first_id + '-' + second_id);
  }

  createYeastRelation(yeast_relation: any): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/yeast_relations/`, { yeast_relation });
  }

  createYeast(send_yeast: any): any {
    const yeast = Object.assign({}, send_yeast);
    yeast.style_yeasts_attributes = yeast.style_yeasts;
    delete yeast.style_yeasts;
    return this.http.post(`${environment.token_auth_config.apiBase}/yeasts/`, {yeast});
  }

  editYeast(yeastId: number, send_yeast: any): any {
    const yeast = Object.assign({}, send_yeast);
    yeast.style_yeasts_attributes = yeast.style_yeasts;
    delete yeast.style_yeasts;
    return this.http.put(`${environment.token_auth_config.apiBase}/yeasts/` + yeastId, {yeast});
  }

  deleteYeast(yeastId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/yeasts/` + yeastId);
  }

  getTypes(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/yeast_types/`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/yeast_types/` + typeId)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
