import { Injectable } from '@angular/core';
import { IMalt } from './malt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class MaltService {

  constructor(private http: HttpClient) { }

  getMalts(): Observable<IMalt[]> {
    return this.http.get("malts")
      .map((response: Response) => <IMalt[]>response.json())
      .catch(this.handleError);
  }

  getMalt(maltId: number): Observable<IMalt> {
    return this.http.get("malts/" + maltId)
      .map((response: Response) => <IMalt>response.json())
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
    return this.http.get("mash_steps/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypes(): any {
    return this.http.get("malt_types/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this.http.get("malt_types/" + typeId)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
