import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWaterAgent } from '../agent';
import { AgentService } from '../agent.service';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agent-new',
  templateUrl: './agent-new.component.html',
  styleUrls: ['./agent-new.component.scss']
})
export class AgentNewComponent implements OnInit {

  newAgentItem: IWaterAgent = {
        id: 0,
        user_id: 0,
        name: "",
        ph: 7,
        calcium: 0,
        magnesium: 0,
        sodium: 0,
        sulfate: 0,
        chloride: 0,
        bicarbonate: 0,
        description: "",
        global: false,
        recipe_count: 0
      };

  @Output()
  onAgentCreate = new EventEmitter();

  createModal: NgbModalRef;

  constructor(private _agentService: AgentService,
    public _authService: AuthService, private _router: Router,
    private _modalService: NgbModal) { }

  ngOnInit() {
  }

  creationSubmit(form: any): void {
    this._agentService.createAgent(this.newAgentItem)
      .subscribe((res) => {
        this.newAgentItem.id = JSON.parse(res._body).id;
        this.newAgentItem.user_id = JSON.parse(res._body).user_id;
        this.onAgentCreate.emit({agent: this.newAgentItem});
        this.createModal.close();

        this.newAgentItem = {
            id: 0,
            user_id: 0,
            name: "",
            ph: 7,
            calcium: 0,
            magnesium: 0,
            sodium: 0,
            sulfate: 0,
            chloride: 0,
            bicarbonate: 0,
            description: "",
            global: false,
            recipe_count: 0
          };
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error adding the agent profile, please try again later.");
        }
        console.error(error);
      });
  }

  open(newAgent) {
    this.createModal = this._modalService.open(newAgent, { size: 'lg' });
  }
}
