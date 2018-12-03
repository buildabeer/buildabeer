import { Injectable } from '@angular/core';
import { IAcid } from './acid';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class AcidService {

  constructor(private http: HttpClient) { }

  getAcids(): Observable<IAcid[]> {
    return this.http.get("acids")
      .map((response: Response) => <IAcid[]>response.json())
      .catch(this.handleError);
  }

  getAcid(acidId: number): Observable<IAcid> {
    return this.http.get("acids/" + acidId)
      .map((response: Response) => <IAcid>response.json())
      .catch(this.handleError);
  }

  createAcid(acid: IAcid): any {
    return this.http.post("acids", {acid})
  }

  editAcid(acid: IAcid): any {
    return this.http.put("acids/" + acid.id, {acid})
  }

  deleteAcid(acidId: number): any {
    return this.http.delete("acids/" + acidId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
