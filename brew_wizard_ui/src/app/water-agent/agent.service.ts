import { Injectable } from '@angular/core';
import { IWaterAgent } from './agent';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AgentService {

  constructor(private http: HttpClient) { }

  getAgents(): Observable<IWaterAgent[]> {
    return this.http.get(`${environment.token_auth_config.apiBase}/water_agents`)
      .map((response: IWaterAgent[]) => response)
      .catch(this.handleError);
  }

  getAgent(agentId: number): Observable<IWaterAgent> {
    return this.http.get(`${environment.token_auth_config.apiBase}/water_agents/` + agentId)
      .map((response: IWaterAgent) => response)
      .catch(this.handleError);
  }

  createAgent(water_agent: IWaterAgent): any {
    return this.http.post(`${environment.token_auth_config.apiBase}/water_agents/`, {water_agent});
  }

  editAgent(water_agent: IWaterAgent): any {
    return this.http.put(`${environment.token_auth_config.apiBase}/water_agents/` + water_agent.id, {water_agent});
  }

  deleteAgent(agentId: number): any {
    return this.http.delete(`${environment.token_auth_config.apiBase}/water_agents/` + agentId);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throwError(error);
  }
}
