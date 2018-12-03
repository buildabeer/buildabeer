import { Injectable } from '@angular/core';
import { IMalt } from './malt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MaltService {

  constructor(private http: HttpClient) { }

  getMalts(): Observable<IMalt[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/malts`)
      .map((response: IMalt[]) => response)
      .catch(this.handleError);
  }

  getMalt(maltId: number): Observable<IMalt> {
    return this.http.get(`${environment.token_auth_config.apiBase}/malts/` + maltId)
      .map((response: IMalt) => response)
      .catch(this.handleError);
  }

  createMalt(malt: IMalt): any {
    return this.http.post("malts/", {malt})
  }

  editMalt(maltId: number, malt: IMalt): any {
    return this.http.put("malts/" + maltId, {malt})
  }

  deleteMalt(maltId: number): any {
    return this.http.delete("malts/" + maltId)
  }

  getMashSteps(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/mash_steps/`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getTypes(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/malt_types/`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/malt_types/` + typeId)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
