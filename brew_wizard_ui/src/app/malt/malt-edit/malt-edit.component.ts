import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMalt } from '../malt';
import { MaltService } from '../malt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-malt-edit',
  templateUrl: './malt-edit.component.html',
  styleUrls: ['./malt-edit.component.scss'],
  outputs: ['onMaltEdit']
})
export class MaltEditComponent implements OnInit {

  maltTypes: string[] = [];
  errorMessage: string = "Loading..."

  @Input()
  originalMaltItem: IMalt;

  editMaltItem: IMalt;

  @Output()
  onMaltEdit = new EventEmitter();

  editModal: NgbModalRef;

  constructor(private _router: Router, private _maltService:
    MaltService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService) { }

  ngOnInit() { }

  editSetup() {
    this._maltService.getTypes()
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
      .subscribe(maltTypeData => {
          this.maltTypes = maltTypeData;
          if(this.maltTypes.length === 0) {
            window.alert("No malt types found.");
          }
        },
        error => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("Problem with the service. Please try against later.");
          }
          console.error(error);
      });
  }

  editSubmit(form: any): void {
    this._maltService.editMalt(this.editMaltItem.id, this.editMaltItem)
      .subscribe((res) => {
        this.onMaltEdit.emit({malt: this.editMaltItem});
        this.editModal.close();
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error processing your request, please try again later.");
        }
        console.error(error);
      });
  }

  open(editMalt) {
    this.editMaltItem = Object.assign({}, this.originalMaltItem)
    this.editSetup();
    this.editModal = this._modalService.open(editMalt, { size: 'lg' });
  }
}
