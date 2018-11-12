import { AuthService } from "../../user/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IStyle } from '../style';
import { StyleService } from '../style.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-style-card',
  templateUrl: './style-card.component.html',
  styleUrls: ['./style-card.component.scss']
})
export class StyleCardComponent implements OnInit {

  isCollapsed: boolean = true;

  @Input()
  style: IStyle;

  @Output()
  onStyleDelete = new EventEmitter();

  @Output()
  onStyleEdit = new EventEmitter();

  constructor(private _styleService: StyleService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/styles')
  }

  deleteCard(): void {
    var recipe_message: string = this.style.recipe_count > 0 ? "This style is used " + this.style.recipe_count + " times, are you sure you want to delete it?" : "Are you sure you want to delete this style?"
    if (window.confirm(recipe_message)) {
      this._styleService.deleteStyle(this.style.id)
        .subscribe((res) => {
          if(this._router.url !== '/styles') {
            this._router.navigate(['/styles'])
          } else {
            this.onStyleDelete.emit({style: this.style});
          }
        }, (error) => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("There was an error deleting the style style, please try again later.");
          }
          console.error(error);
        })
    }
  }

  editEvent(event): void {
    this.style = event.style;
    this.onStyleEdit.emit({style: this.style});
  }
}
