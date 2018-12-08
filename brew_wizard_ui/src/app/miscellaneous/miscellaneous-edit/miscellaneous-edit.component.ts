import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMiscellaneous } from '../miscellaneous';
import { MiscellaneousService } from '../miscellaneous.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-miscellaneous-edit',
  templateUrl: './miscellaneous-edit.component.html',
  styleUrls: ['./miscellaneous-edit.component.scss']
})
export class MiscellaneousEditComponent implements OnInit {

  errorMessage = 'Loading...';

  @Input()
  originalMiscellaneousItem: IMiscellaneous;

  editMiscellaneousItem: IMiscellaneous;

  @Output()
  uponMiscellaneousEdit = new EventEmitter();

  editModal: NgbModalRef;

  misc_types: string[] = ['Spice', 'Fining', 'Herb', 'Flavor', 'Other'];
  misc_usages: string[] = ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling'];

  misc_time_label = 1;

  constructor(private _router: Router, private _miscellaneousService:
    MiscellaneousService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService) { }

  ngOnInit() { }

  editSubmit(form: any): void {
    this.editMiscellaneousItem.time = this.editMiscellaneousItem.time * this.misc_time_label;
    this._miscellaneousService.editMiscellaneous(this.editMiscellaneousItem.id, this.editMiscellaneousItem)
      .subscribe((res) => {
        this.uponMiscellaneousEdit.emit({miscellaneous: this.editMiscellaneousItem});
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

  open(editMiscellaneous) {
    this.editMiscellaneousItem = Object.assign({}, this.originalMiscellaneousItem);

    switch (this._miscellaneousService.calculateTime(this.editMiscellaneousItem.time).label) {
      case 'days':
        this.misc_time_label = 24 * 60;
        break;
      case 'hours':
        this.misc_time_label = 60;
        break;
      case 'minutes':
        this.misc_time_label = 1;
        break;
    }
    this.editMiscellaneousItem.time = this._miscellaneousService.calculateTime(this.editMiscellaneousItem.time).time;

    this.editModal = this._modalService.open(editMiscellaneous, { size: 'lg' });
  }
}
