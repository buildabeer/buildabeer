import { AuthService } from "../../user/auth.service";
import { Component, OnInit } from '@angular/core';
import { IWaterAgent } from '../agent';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  agents: IWaterAgent[] = [];
  displayedAgents: IWaterAgent[] = [];
  search: string = "";
  title: string = "Water Agents";
  selectedAgentCountDropdown: string = "All";
  errorMessage: string = "Loading data...";
  page: number = 1;
  pageText: number = 1;

  constructor(private _agentService: AgentService,
    public _authService: AuthService) { }

  ngOnInit() {
    this._agentService.getAgents()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if(retryCount < 3) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000)
      })
      .subscribe(agentData => {
          this.agents = agentData;
          this.displayedAgents = agentData;
          this.errorMessage = "No data found."
        },
        error => {
          if (error.status == "401") {
            this.errorMessage = "You must log in first.";
          } else {
            this.errorMessage = "Problem with the service. Please try against later.";
          }
          console.error(error);
      });
  }

  filterAgents(resetPage = true): void {
    if(resetPage) {
      this.page = 1;
      this.pageText = 1;
    }

    this.displayedAgents = this.agents;

    if(this.selectedAgentCountDropdown !== "All") {
      this.displayedAgents = this.displayedAgents.filter(w => (w.global &&
        this.selectedAgentCountDropdown === "Global") || (!w.global &&
        this.selectedAgentCountDropdown === "Local"));
    }
  }

  searchedAgents(): IWaterAgent[] {
    return this.displayedAgents
      .filter(w => w.name.match(new RegExp(this.search, "i")));
  }

  trackByAgentName(index: number, agent: any): string {
    return agent.name;
  }

  onPageChange(): void {
    if(this.page > this.getPageCount()) {
      this.page = this.getPageCount();
    } else if (this.page < 1) {
      this.page = 1;
    }
    this.pageText = this.page;
  }

  getPageCount(): number {
    return Math.ceil(this.searchedAgents().length / 20) > 0 ?
      Math.ceil(this.searchedAgents().length / 20) : 1;
  }

  getTotalAgentCount(): number {
    return this.agents
      .filter(w => w.name.match(new RegExp(this.search, "i"))).length;
  }

  getGlobalAgentCount(): number {
    return this.agents.filter(w => w.global === true)
      .filter(w => w.name.match(new RegExp(this.search, "i"))).length;
  }

  getLocalAgentCount(): number {
    return this.agents.filter(w => w.global === false)
      .filter(w => w.name.match(new RegExp(this.search, "i"))).length;
  }

  onAgentCountDropdownChange(selectedDropdownValue: string): void {
    this.selectedAgentCountDropdown = selectedDropdownValue;
  }

  onSearchChange(searchText: string): void {
    this.search = searchText;
  }

  createEvent(event): void {
    this.agents.unshift(event.agent);
  }

  editEvent(event): void {
    var index = -1;
    this.agents.forEach((agent, i) => {
      if(agent.id === event.agent.id) {
        index = i;
      }
    })
    if (index > -1) {
      this.agents[index] = event.agent;
      this.filterAgents(false);
    }
  }

  deleteEvent(event): void {
    var index = this.agents.indexOf(event.agent);
    if (index > -1) {
      this.agents.splice(index, 1);
    }
  }
}
