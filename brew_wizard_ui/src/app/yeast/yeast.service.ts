import { Injectable } from '@angular/core';
import { IYeast } from './yeast';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class YeastService {

  constructor(private http: HttpClient) { }

  getYeasts(): Observable<IYeast[]> {
    return this.http.get("yeasts")
      .map((response: Response) => <IYeast[]>response.json())
      .catch(this.handleError);
  }

  getYeast(yeastId: number): Observable<IYeast> {
    return this.http.get("yeasts/" + yeastId)
      .map((response: Response) => <IYeast>response.json())
      .catch(this.handleError);
  }

  createYeast(send_yeast: any): any {
    var yeast = Object.assign({}, send_yeast)
    yeast.style_yeasts_attributes = yeast.style_yeasts
    delete yeast.style_yeasts
    return this.http.post("yeasts/", {yeast})
  }

  editYeast(yeastId: number, send_yeast: any): any {
    var yeast = Object.assign({}, send_yeast)
    yeast.style_yeasts_attributes = yeast.style_yeasts
    delete yeast.style_yeasts
    return this.http.put("yeasts/" + yeastId, {yeast})
  }

  deleteYeast(yeastId: number): any {
    return this.http.delete("yeasts/" + yeastId)
  }

  getTypes(): any {
    return this.http.get("yeast_types/")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTypeById(typeId: number): any {
    return this.http.get("yeast_types/" + typeId)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
