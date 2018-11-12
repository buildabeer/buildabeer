import { AuthService } from "../../user/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWaterAgent } from '../agent';
import { AgentService } from '../agent.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agent-card',
  templateUrl: './agent-card.component.html',
  styleUrls: ['./agent-card.component.scss']
})
export class AgentCardComponent implements OnInit {

  isCollapsed: boolean = true;

  @Input()
  agent: IWaterAgent;

  @Output()
  onAgentDelete = new EventEmitter();

  @Output()
  onAgentEdit = new EventEmitter();

  constructor(private _agentService: AgentService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/water_agents')
  }

  deleteCard(): void {
    var recipe_message: string = this.agent.recipe_count > 0 ? "This agent is used " + this.agent.recipe_count + " times, are you sure you want to delete it?" : "Are you sure you want to delete this agent?"
    if (window.confirm(recipe_message)) {
      this._agentService.deleteAgent(this.agent.id)
        .subscribe((res) => {
          if(this._router.url !== '/water_agents') {
            this._router.navigate(['/water_agents'])
          } else {
            this.onAgentDelete.emit({agent: this.agent});
          }
        }, (error) => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("There was an error deleting the agent agent, please try again later.");
          }
          console.error(error);
        })
    }
  }

  editEvent(event): void {
    this.agent = event.agent;
    this.onAgentEdit.emit({agent: this.agent});
  }
}
