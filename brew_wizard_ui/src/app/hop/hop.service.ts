import { Injectable } from '@angular/core';
import { IHop } from './hop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class HopService {

  constructor(private http: HttpClient) { }

  getHops(): Observable<IHop[]> {
    return this.http.get("hops")
      .map((response: Response) => <IHop[]>response.json())
      .catch(this.handleError);
  }

  getHop(hopId: number): Observable<IHop> {
    return this.http.get("hops/" + hopId)
      .map((response: Response) => <IHop>response.json())
      .catch(this.handleError);
  }

  createHop(send_hop: any): any {
    var hop = Object.assign({}, send_hop)
    hop.hop_relations_attributes = hop.hop_relations
    delete hop.hop_relations
    return this.http.post("hops/", {hop})
  }

  editHop(hopId: number, send_hop: any): any {
    var hop = Object.assign({}, send_hop)
    hop.hop_relations_attributes = hop.hop_relations
    delete hop.hop_relations
    return this.http.put("hops/" + hopId, {hop})
  }

  deleteHop(hopId: number): any {
    return this.http.delete("hops/" + hopId)
  }

  getTypes(): any {
    return this.http.get("hop_types/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this.http.get("hop_types/" + typeId)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
