import { Injectable } from '@angular/core';
import { IAcid } from './acid';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class AcidService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  getAcids(): Observable<IAcid[]> {
    return this._angularTokenService.get("acids")
      .map((response: Response) => <IAcid[]>response.json())
      .catch(this.handleError);
  }

  getAcid(acidId: number): Observable<IAcid> {
    return this._angularTokenService.get("acids/" + acidId)
      .map((response: Response) => <IAcid>response.json())
      .catch(this.handleError);
  }

  createAcid(acid: IAcid): any {
    return this._angularTokenService.post("acids", {acid})
  }

  editAcid(acid: IAcid): any {
    return this._angularTokenService.put("acids/" + acid.id, {acid})
  }

  deleteAcid(acidId: number): any {
    return this._angularTokenService.delete("acids/" + acidId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
