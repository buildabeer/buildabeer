import { Injectable } from '@angular/core';
import { IMalt } from './malt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class MaltService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  getMalts(): Observable<IMalt[]> {
    return this._angularTokenService.get("malts")
      .map((response: Response) => <IMalt[]>response.json())
      .catch(this.handleError);
  }

  getMalt(maltId: number): Observable<IMalt> {
    return this._angularTokenService.get("malts/" + maltId)
      .map((response: Response) => <IMalt>response.json())
      .catch(this.handleError);
  }

  createMalt(malt: IMalt): any {
    return this._angularTokenService.post("malts/", {malt})
  }

  editMalt(maltId: number, malt: IMalt): any {
    return this._angularTokenService.put("malts/" + maltId, {malt})
  }

  deleteMalt(maltId: number): any {
    return this._angularTokenService.delete("malts/" + maltId)
  }

  getMashSteps(): any {
    return this._angularTokenService.get("mash_steps/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypes(): any {
    return this._angularTokenService.get("malt_types/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this._angularTokenService.get("malt_types/" + typeId)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
