import { Injectable } from '@angular/core';
import { IAcid } from './acid';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable()
export class AcidService {

  constructor(private http: HttpClient) { }

  getAcids(): Observable<IAcid[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/acids`)
      .map((response: IAcid[]) => response)
      .catch(this.handleError);
  }

  getAcid(acidId: number): Observable<IAcid> {
    return this.http.get(`${environment.token_auth_config.apiBase}/acids/` + acidId)
      .map((response: IAcid) => response)
      .catch(this.handleError);
  }

  createAcid(acid: IAcid): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/acids`, {acid});
  }

  editAcid(acid: IAcid): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/acids/` + acid.id, {acid});
  }

  deleteAcid(acidId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/acids/` + acidId);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
