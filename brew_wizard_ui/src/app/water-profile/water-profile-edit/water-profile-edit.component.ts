import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWaterProfile } from '../water-profile';
import { WaterProfileService } from '../water-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-water-profile-edit',
  templateUrl: './water-profile-edit.component.html',
  styleUrls: ['./water-profile-edit.component.scss']
})
export class WaterProfileEditComponent implements OnInit {

  errorMessage = 'Loading...';

  originalName: string;

  @Input()
  originalWaterProfile: IWaterProfile;

  editWaterProfile: IWaterProfile;

  @Output()
  uponWaterEdit = new EventEmitter();

  editModal: NgbModalRef;

  constructor(private _router: Router, private _waterProfileService:
    WaterProfileService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService) { }

  ngOnInit() { }

  editSubmit(form: any): void {
    this._waterProfileService.editWaterProfile(this.editWaterProfile)
      .subscribe((res) => {
        this.uponWaterEdit.emit({waterProfile: this.editWaterProfile});
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

  open(editWater) {
    this.editWaterProfile = Object.assign({}, this.originalWaterProfile);
    this.editModal = this._modalService.open(editWater, { size: 'lg' });
  }
}
