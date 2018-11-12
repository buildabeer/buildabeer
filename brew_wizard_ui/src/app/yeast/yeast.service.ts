import { Injectable } from '@angular/core';
import { IYeast } from './yeast';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class YeastService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  getYeasts(): Observable<IYeast[]> {
    return this._angularTokenService.get("yeasts")
      .map((response: Response) => <IYeast[]>response.json())
      .catch(this.handleError);
  }

  getYeast(yeastId: number): Observable<IYeast> {
    return this._angularTokenService.get("yeasts/" + yeastId)
      .map((response: Response) => <IYeast>response.json())
      .catch(this.handleError);
  }

  createYeast(send_yeast: any): any {
    var yeast = Object.assign({}, send_yeast)
    yeast.style_yeasts_attributes = yeast.style_yeasts
    delete yeast.style_yeasts
    return this._angularTokenService.post("yeasts/", {yeast})
  }

  editYeast(yeastId: number, send_yeast: any): any {
    var yeast = Object.assign({}, send_yeast)
    yeast.style_yeasts_attributes = yeast.style_yeasts
    delete yeast.style_yeasts
    return this._angularTokenService.put("yeasts/" + yeastId, {yeast})
  }

  deleteYeast(yeastId: number): any {
    return this._angularTokenService.delete("yeasts/" + yeastId)
  }

  getTypes(): any {
    return this._angularTokenService.get("yeast_types/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this._angularTokenService.get("yeast_types/" + typeId)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
