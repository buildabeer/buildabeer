import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class NewHistoryService {

  constructor(private http: HttpClient) { }

  getHistories(page): any {
    const query_string_array: string[] = [];
    let query_string = '';
    if (page) {
      query_string_array.push('page=' + page);
    }
    if (query_string_array.length > 0) {
      query_string = '?' + query_string_array.join('&');
    }
    return this.http.get(`${environment.token_auth_config.apiBase}/new_histories` + query_string)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  getHistory(historyId: number): Observable<any> {
    return this.http.get(`${environment.token_auth_config.apiBase}/new_histories/` + historyId)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  createHistory(new_history: any): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/new_histories/`, {new_history});
  }

  editHistory(new_history: any): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/new_histories/` + new_history.id, {new_history});
  }

  deleteHistory(new_history_id: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/new_histories/` + new_history_id);
  }

  getHistoryCount(): Observable<any> {
    return this.http.get(`${environment.token_auth_config.apiBase}/new_histories/count`)
      .map((response: any) => response)
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
