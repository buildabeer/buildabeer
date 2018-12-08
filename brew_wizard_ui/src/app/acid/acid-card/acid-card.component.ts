import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAcid } from '../acid';
import { AcidService } from '../acid.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-acid-card',
  templateUrl: './acid-card.component.html',
  styleUrls: ['./acid-card.component.scss']
})
export class AcidCardComponent implements OnInit {

  isCollapsed = true;

  @Input()
  acid: IAcid;

  uponAcidDelete = new EventEmitter();

  @Output()
  uponAcidEdit = new EventEmitter();

  constructor(private _acidService: AcidService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/acids');
  }

  deleteCard(): void {
    const recipe_message = 'Are you sure you want to delete this acid?';
    if (window.confirm(recipe_message)) {
      this._acidService.deleteAcid(this.acid.id)
        .subscribe((res) => {
          if (this._router.url !== '/acids') {
            this._router.navigate(['/acids']);
          } else {
            this.uponAcidDelete.emit({acid: this.acid});
          }
        }, (error) => {
          if (error.status === 401) {
            window.alert('You must log in first.');
          } else {
            window.alert('There was an error deleting the acid acid, please try again later.');
          }
          console.error(error);
        });
    }
  }

  editEvent(event): void {
    this.acid = event.acid;
    this.uponAcidEdit.emit({acid: this.acid});
  }
}
