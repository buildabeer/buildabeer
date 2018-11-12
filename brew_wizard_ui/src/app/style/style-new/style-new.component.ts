import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IStyle } from '../style';
import { StyleService } from '../style.service';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-style-new',
  templateUrl: './style-new.component.html',
  styleUrls: ['./style-new.component.scss']
})
export class StyleNewComponent implements OnInit {

  water_profiles: any[] = []

  newStyleItem: IStyle = {
        id: 0,
        user_id: 0,
        name: "",
        category_name: "",
        category_number: 0,
        subcategory: 'A',
        style_type: "",
        min_og: 0,
        max_og: 0,
        min_fg: 0,
        max_fg: 0,
        min_ibu: 0,
        max_ibu: 0,
        min_carb: 0,
        max_carb: 0,
        min_color: 0,
        max_color: 0,
        min_abv: 0,
        max_abv: 0,
        description: "",
        profile: "",
        ingredients: "",
        examples: "",
        global: false,
        recipe_count: 0,
        water_profile_id: null
      };

  @Output()
  onStyleCreate = new EventEmitter();

  createModal: NgbModalRef;

  constructor(private _styleService: StyleService,
    public _authService: AuthService, private _router: Router,
    private _modalService: NgbModal) { }

  ngOnInit() {
  }

  creationSubmit(form: any): void {
    this._styleService.createStyle(this.newStyleItem)
      .subscribe((res) => {
        this.newStyleItem.id = JSON.parse(res._body).id;
        this.newStyleItem.user_id = JSON.parse(res._body).user_id;
        this.onStyleCreate.emit({style: this.newStyleItem});
        this.createModal.close();

        this.newStyleItem = {
          id: 0,
          user_id: 0,
          name: "",
          category_name: "",
          category_number: 0,
          subcategory: 'A',
          style_type: "",
          min_og: 0,
          max_og: 0,
          min_fg: 0,
          max_fg: 0,
          min_ibu: 0,
          max_ibu: 0,
          min_carb: 0,
          max_carb: 0,
          min_color: 0,
          max_color: 0,
          min_abv: 0,
          max_abv: 0,
          description: "",
          profile: "",
          ingredients: "",
          examples: "",
          global: false,
          recipe_count: 0,
          water_profile_id: null
        };
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error adding the style, please try again later.");
        }
        console.error(error);
      });
  }

  open(newStyle) {
    this.createModal = this._modalService.open(newStyle, { size: 'lg' });

    this._styleService.getWaterProfiles()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if(retryCount < 3) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000)
      })
      .subscribe(waterProfileData => {
          this.water_profiles = waterProfileData;
        },
        error => {
          console.error(error);
      });
  }
}
