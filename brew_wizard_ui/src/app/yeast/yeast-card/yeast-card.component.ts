import { AuthService } from "../../user/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IYeast } from '../yeast';
import { YeastService } from '../yeast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-yeast-card',
  templateUrl: './yeast-card.component.html',
  styleUrls: ['./yeast-card.component.scss']
})
export class YeastCardComponent implements OnInit {

  isCollapsed: boolean = true;

  @Input()
  yeast: IYeast;

  @Input()
  yeast_type: string;

  @Output()
  onYeastDelete = new EventEmitter();

  @Output()
  onYeastEdit = new EventEmitter();

  constructor(private _yeastService: YeastService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/yeasts')
  }

  deleteCard(): void {
    var recipe_message: string = this.yeast.recipe_count > 0 ? "This yeast is used " + this.yeast.recipe_count + " times, are you sure you want to delete it?" : "Are you sure you want to delete this yeast?"
    if (window.confirm(recipe_message)) {
      this._yeastService.deleteYeast(this.yeast.id)
        .subscribe((res) => {
          if(this._router.url !== '/yeasts') {
            this._router.navigate(['/yeasts'])
          } else {
            this.onYeastDelete.emit({yeast: this.yeast});
          }
        }, (error) => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("There was an error deleting the yeast yeast, please try again later.");
          }
          console.error(error);
        })
    }
  }

  editEvent(event): void {
    this.yeast = event.yeast;
    this.onYeastEdit.emit({yeast: this.yeast});
  }
}
