import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IStyle } from '../style';
import { StyleService } from '../style.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-style-edit',
  templateUrl: './style-edit.component.html',
  styleUrls: ['./style-edit.component.scss']
})
export class StyleEditComponent implements OnInit {

  water_profiles: any[] = [];

  errorMessage = 'Loading...';

  @Input()
  originalStyle: IStyle;

  editStyleItem: IStyle;

  @Output()
  uponStyleEdit = new EventEmitter();

  editModal: NgbModalRef;

  constructor(private _router: Router, private _styleService:
    StyleService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService) { }

  ngOnInit() { }

  editSubmit(form: any): void {
    this._styleService.editStyle(this.originalStyle.id, this.editStyleItem)
      .subscribe((res) => {
        this.uponStyleEdit.emit({style: this.editStyleItem});
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

  open(editStyle) {
    this.editStyleItem = Object.assign({}, this.originalStyle);
    this.editModal = this._modalService.open(editStyle, { size: 'lg' });

    this._styleService.getWaterProfiles()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 3) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000);
      })
      .subscribe(waterProfileData => {
          this.water_profiles = waterProfileData;
        },
        error => {
          console.error(error);
      });
  }
}
