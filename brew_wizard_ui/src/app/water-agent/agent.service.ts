import { Injectable } from '@angular/core';
import { IWaterAgent } from './agent';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Angular2TokenService } from 'angular2-token';
import { Response } from '@angular/http';

@Injectable()
export class AgentService {

  constructor(private _angularTokenService: Angular2TokenService) { }

  getAgents(): Observable<IWaterAgent[]> {
    return this._angularTokenService.get("water_agents")
      .map((response: Response) => <IWaterAgent[]>response.json())
      .catch(this.handleError);
  }

  getAgent(agentId: number): Observable<IWaterAgent> {
    return this._angularTokenService.get("water_agents/" + agentId)
      .map((response: Response) => <IWaterAgent>response.json())
      .catch(this.handleError);
  }

  createAgent(water_agent: IWaterAgent): any {
    return this._angularTokenService.post("water_agents/", {water_agent})
  }

  editAgent(water_agent: IWaterAgent): any {
    return this._angularTokenService.put("water_agents/" + water_agent.id, {water_agent})
  }

  deleteAgent(agentId: number): any {
    return this._angularTokenService.delete("water_agents/" + agentId)
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
