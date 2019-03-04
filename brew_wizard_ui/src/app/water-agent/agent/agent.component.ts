import { Component, OnInit } from '@angular/core';
import { IWaterAgent } from '../agent';
import { AgentService } from '../agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  agent: IWaterAgent;
  errorMessage = 'Loading...';

  constructor(private _agentService: AgentService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const agentId: number = this._activatedRoute.snapshot.params['id'];
    this._agentService.getAgent(agentId)
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 6) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000);
      })
      .subscribe((agentData) => {
        if (agentData === null) {
          this.errorMessage = 'Specified agent was not found.';
        } else {
          this.agent = agentData;
          this.errorMessage = '';
        }
      }, (error) => {
          if (error.status === 401) {
            this.errorMessage = 'You must log in first.';
          } else {
            this.errorMessage = 'Problem with the service. Please try again later.';
          }
          console.error(error);
      });
  }

  onBackButtonClick(): void {
    this._router.navigate(['/water_agents']);
  }
}
