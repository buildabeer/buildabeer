import { AuthService } from "../../user/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHop } from '../hop';
import { HopService } from '../hop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hop-card',
  templateUrl: './hop-card.component.html',
  styleUrls: ['./hop-card.component.scss']
})
export class HopCardComponent implements OnInit {

  isCollapsed: boolean = true;

  @Input()
  hop: IHop;

  @Input()
  hop_type: string;

  @Output()
  onHopDelete = new EventEmitter();

  @Output()
  onHopEdit = new EventEmitter();

  constructor(private _hopService: HopService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/hops')
  }

  deleteCard(): void {
    var recipe_message: string = this.hop.recipe_count > 0 ? "This hop is used " + this.hop.recipe_count + " times, are you sure you want to delete it?" : "Are you sure you want to delete this hop?"
    if (window.confirm(recipe_message)) {
      this._hopService.deleteHop(this.hop.id)
        .subscribe((res) => {
          if(this._router.url !== '/hops') {
            this._router.navigate(['/hops'])
          } else {
            this.onHopDelete.emit({hop: this.hop});
          }
        }, (error) => {
          if (error.status == "401") {
            window.alert("You must log in first.");
          } else {
            window.alert("There was an error deleting the hop, please try again later.");
          }
          console.error(error);
        })
    }
  }

  editEvent(event): void {
    this.hop = event.hop;
    this.onHopEdit.emit({hop: this.hop});
  }
}
