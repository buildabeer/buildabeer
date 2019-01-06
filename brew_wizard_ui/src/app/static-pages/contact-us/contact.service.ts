import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: Http) { }

  sendContact(contact): Observable<Response> {
    return this._http.post(environment.token_auth_config.apiBase + '/contact_us', contact)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
