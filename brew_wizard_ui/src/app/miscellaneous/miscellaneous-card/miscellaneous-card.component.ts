import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMiscellaneous } from '../miscellaneous';
import { MiscellaneousService } from '../miscellaneous.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-miscellaneous-card',
  templateUrl: './miscellaneous-card.component.html',
  styleUrls: ['./miscellaneous-card.component.scss']
})
export class MiscellaneousCardComponent implements OnInit {

  isCollapsed = true;

  @Input()
  miscellaneous: IMiscellaneous;

  @Input()
  miscellaneous_type: string;

  @Output()
  uponMiscellaneousDelete = new EventEmitter();

  @Output()
  uponMiscellaneousEdit = new EventEmitter();

  constructor(private _miscellaneousService: MiscellaneousService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/miscellaneous');
  }

  deleteCard(): void {
    const recipe_message: string = this.miscellaneous.recipe_count > 0
    ? 'This miscellaneous is used ' + this.miscellaneous.recipe_count + ' times, are you sure you want to delete it?'
    : 'Are you sure you want to delete this miscellaneous?';
    if (window.confirm(recipe_message)) {
      this._miscellaneousService.deleteMiscellaneous(this.miscellaneous.id)
        .subscribe((res) => {
          if (this._router.url !== '/miscellaneous') {
            this._router.navigate(['/miscellaneous']);
          } else {
            this.uponMiscellaneousDelete.emit({miscellaneous: this.miscellaneous});
          }
        }, (error) => {
          if (error.status === 401) {
            window.alert('You must log in first.');
          } else {
            window.alert('There was an error deleting the miscellaneous miscellaneous, please try again later.');
          }
          console.error(error);
        });
    }
  }

  editEvent(event): void {
    this.miscellaneous = event.miscellaneous;
    this.uponMiscellaneousEdit.emit({miscellaneous: this.miscellaneous});
  }
}
