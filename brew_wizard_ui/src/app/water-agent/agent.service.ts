import { Injectable } from '@angular/core';
import { IWaterAgent } from './agent';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class AgentService {

  constructor(private http: HttpClient) { }

  getAgents(): Observable<IWaterAgent[]> {
    return this.http.get("water_agents")
      .map((response: Response) => <IWaterAgent[]>response.json())
      .catch(this.handleError);
  }

  getAgent(agentId: number): Observable<IWaterAgent> {
    return this.http.get("water_agents/" + agentId)
      .map((response: Response) => <IWaterAgent>response.json())
      .catch(this.handleError);
  }

  createAgent(water_agent: IWaterAgent): any {
    return this.http.post("water_agents/", {water_agent})
  }

  editAgent(water_agent: IWaterAgent): any {
    return this.http.put("water_agents/" + water_agent.id, {water_agent})
  }

  deleteAgent(agentId: number): any {
    return this.http.delete("water_agents/" + agentId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
