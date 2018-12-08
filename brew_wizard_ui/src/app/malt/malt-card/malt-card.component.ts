import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMalt } from '../malt';
import { MaltService } from '../malt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-malt-card',
  templateUrl: './malt-card.component.html',
  styleUrls: ['./malt-card.component.scss']
})
export class MaltCardComponent implements OnInit {

  isCollapsed = true;

  @Input()
  malt: IMalt;

  @Input()
  malt_type: string;

  @Output()
  uponMaltDelete = new EventEmitter();

  @Output()
  uponMaltEdit = new EventEmitter();

  constructor(private _maltService: MaltService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/malts');
  }

  deleteCard(): void {
    const recipe_message: string = this.malt.recipe_count > 0
    ? 'This malt is used ' + this.malt.recipe_count + ' times, are you sure you want to delete it?'
    : 'Are you sure you want to delete this malt?';
    if (window.confirm(recipe_message)) {
      this._maltService.deleteMalt(this.malt.id)
        .subscribe((res) => {
          if (this._router.url !== '/malts') {
            this._router.navigate(['/malts']);
          } else {
            this.uponMaltDelete.emit({malt: this.malt});
          }
        }, (error) => {
          if (error.status === 401) {
            window.alert('You must log in first.');
          } else {
            window.alert('There was an error deleting the malt malt, please try again later.');
          }
          console.error(error);
        });
    }
  }

  editEvent(event): void {
    this.malt = event.malt;
    this.uponMaltEdit.emit({malt: this.malt});
  }
}
