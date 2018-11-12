import { Injectable } from '@angular/core';
import { IHop } from './hop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class HopService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  getHops(): Observable<IHop[]> {
    return this._angularTokenService.get("hops")
      .map((response: Response) => <IHop[]>response.json())
      .catch(this.handleError);
  }

  getHop(hopId: number): Observable<IHop> {
    return this._angularTokenService.get("hops/" + hopId)
      .map((response: Response) => <IHop>response.json())
      .catch(this.handleError);
  }

  createHop(send_hop: any): any {
    var hop = Object.assign({}, send_hop)
    hop.hop_relations_attributes = hop.hop_relations
    delete hop.hop_relations
    return this._angularTokenService.post("hops/", {hop})
  }

  editHop(hopId: number, send_hop: any): any {
    var hop = Object.assign({}, send_hop)
    hop.hop_relations_attributes = hop.hop_relations
    delete hop.hop_relations
    return this._angularTokenService.put("hops/" + hopId, {hop})
  }

  deleteHop(hopId: number): any {
    return this._angularTokenService.delete("hops/" + hopId)
  }

  getTypes(): any {
    return this._angularTokenService.get("hop_types/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this._angularTokenService.get("hop_types/" + typeId)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
