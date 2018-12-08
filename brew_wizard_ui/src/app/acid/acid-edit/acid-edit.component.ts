import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAcid } from '../acid';
import { AcidService } from '../acid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-acid-edit',
  templateUrl: './acid-edit.component.html',
  styleUrls: ['./acid-edit.component.scss']
})
export class AcidEditComponent implements OnInit {

  errorMessage = 'Loading...';

  originalName: string;

  @Input()
  originalAcid: IAcid;

  editAcid: IAcid;

  uponAcidEdit = new EventEmitter();

  editModal: NgbModalRef;

  constructor(private _router: Router, private _acidService:
    AcidService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService) { }

  ngOnInit() { }

  editSubmit(form: any): void {
    this._acidService.editAcid(this.editAcid)
      .subscribe((res) => {
        this.uponAcidEdit.emit({acid: this.editAcid});
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

  open(editAcid) {
    this.editAcid = Object.assign({}, this.originalAcid);
    this.editModal = this._modalService.open(editAcid, { size: 'lg' });
  }
}
