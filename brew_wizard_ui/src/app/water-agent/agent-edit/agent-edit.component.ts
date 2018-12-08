import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWaterAgent } from '../agent';
import { AgentService } from '../agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.scss']
})
export class AgentEditComponent implements OnInit {

  errorMessage = 'Loading...';

  @Input()
  originalWaterAgent: IWaterAgent;

  editWaterAgent: IWaterAgent;

  @Output()
  uponAgentEdit = new EventEmitter();

  editModal: NgbModalRef;

  constructor(private _router: Router, private _agentService:
    AgentService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService) { }

  ngOnInit() { }

  editSubmit(form: any): void {
    this._agentService.editAgent(this.editWaterAgent)
      .subscribe((res) => {
        this.uponAgentEdit.emit({agent: this.editWaterAgent});
        this.editModal.close();
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error processing your request, please try again later.');
        }
        console.error(error);
      });
  }

  open(editAgent) {
    this.editWaterAgent = Object.assign({}, this.originalWaterAgent);
    this.editModal = this._modalService.open(editAgent, { size: 'lg' });
  }
}
