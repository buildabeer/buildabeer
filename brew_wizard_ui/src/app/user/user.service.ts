import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { IMeasurementSetting } from './measurement-setting';
import { ICalendarEvent } from './calendar-event';
import { IHistory } from './history';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getSettings(): Observable<IMeasurementSetting> {
    return this.http.get(`${environment.token_auth_config.apiBase}/measurement_settings/`)
      .map((response: IMeasurementSetting) => response)
      .catch(this.handleError);
  }

  editSettings(measurement_setting: IMeasurementSetting): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/measurement_settings/`, {measurement_setting});
  }

  getEvents(start: Date, end: Date): Observable<any[]> {
    return this.http
    .get(`${environment.token_auth_config.apiBase}/calendar_events?calendar_start=" + start.toString()+"&calendar_end=` + end.toString())
      .map((response: any[]) => response)
      .catch(this.handleError);
  }

  createEvent(calendar_event: ICalendarEvent): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/calendar_events/`, { calendar_event });
  }

  createEvents(calendar_events: ICalendarEvent[]): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/calendar_events/multi_create/`, { calendar_events });
  }

  editEvent(calendar_event: ICalendarEvent): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/calendar_events/` + calendar_event.id, { calendar_event });
  }

  deleteEvent(eventId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/calendar_events/` + eventId);
  }

  getHistory(): Observable<IHistory[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/histories`)
      .map((response: any[]) => response)
      .catch(this.handleError);
  }

  createHistory(history: IHistory): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/histories/`, { history });
  }

  editHistory(history: IHistory): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/histories/` + history.id, { history });
  }

  deleteHistory(historyId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/histories/` + historyId);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
