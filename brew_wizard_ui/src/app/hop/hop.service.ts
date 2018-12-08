import { Injectable } from '@angular/core';
import { IHop } from './hop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HopService {

  constructor(private http: HttpClient) { }

  getHops(): Observable<IHop[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/hops`)
      .map((response: IHop[]) => response)
      .catch(this.handleError);
  }

  getHop(hopId: number): Observable<IHop> {
    return this.http.get(`${environment.token_auth_config.apiBase}/hops/` + hopId)
      .map((response: IHop) => response)
      .catch(this.handleError);
  }

  createHop(send_hop: any): any {
    const hop = Object.assign({}, send_hop);
    hop.hop_relations_attributes = hop.hop_relations;
    delete hop.hop_relations;
    return this.http.post(`${environment.token_auth_config.apiBase}/hops/`, {hop});
  }

  editHop(hopId: number, send_hop: any): any {
    const hop = Object.assign({}, send_hop);
    hop.hop_relations_attributes = hop.hop_relations;
    delete hop.hop_relations;
    return this.http.put(`${environment.token_auth_config.apiBase}/hops/` + hopId, {hop});
  }

  deleteHop(hopId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/hops/` + hopId);
  }

  getTypes(): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/hop_types/`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this.http.get(`${environment.token_auth_config.apiBase}/hop_types/` + typeId)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
