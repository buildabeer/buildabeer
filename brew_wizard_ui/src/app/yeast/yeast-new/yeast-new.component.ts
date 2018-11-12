import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IYeast } from '../yeast';
import { YeastService } from '../yeast.service';
import { Router } from '@angular/router';
import { StyleService } from './../../style/style.service';
import { IStyle } from './../../style/style';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yeast-new',
  templateUrl: './yeast-new.component.html',
  styleUrls: ['./yeast-new.component.scss']
})
export class YeastNewComponent implements OnInit {

  newYeastItem: IYeast = {
        id: 0,
        user_id: 0,
        name: "",
        global: false,
        lab: "",
        product_id: "",
        yeast_type: "",
        form: "",
        flocculation: 0,
        min_attenuation: 0,
        max_attenuation: 0,
        min_temperature: 0,
        max_temperature: 0,
        cell_count: 100,
        description: "",
        recipe_count: 0,
        style_yeasts: [],
        yeast_relations: []
      };

  styles: IStyle[] = [];
  used_styles: IStyle[] = [];
  selected_style: IStyle = null;
  yeast_style_collapse: boolean;

  yeasts: IYeast[] = [];
  used_yeasts: IYeast[] = [];
  selected_yeast: IYeast = null;
  yeast_relation_collapse: boolean;

  @Output()
  onYeastCreate = new EventEmitter();

  createModal: NgbModalRef;

  constructor(private _yeastService: YeastService,
    public _authService: AuthService, private _router: Router,
    private _modalService: NgbModal, private _styleService: StyleService) { }

  ngOnInit() { }

  onAddStyle(add_style): void {
    setTimeout(() => {
      this.selected_style = null;
    });

    this.used_styles.push(add_style);
    this.newYeastItem.style_yeasts.push({ id: null, style_id: add_style.id, yeast_id: this.newYeastItem.id });
    this.styles.splice(this.styles.indexOf(add_style), 1)
  }

  removeStyle(style_index): void {
    this.styles.push(this.used_styles[style_index])
    this.newYeastItem.style_yeasts.splice(style_index, 1);
    this.used_styles.splice(style_index, 1);
    this.styles.sort(function(a,b) {return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0); });
  }

  onAddYeast(add_yeast): void {
    setTimeout(() => {
      this.selected_yeast = null;
    });

    this.used_yeasts.push(add_yeast);
    this.newYeastItem.yeast_relations.push({ id: null, yeast_id: this.newYeastItem.id, yeast_relation_id: add_yeast.id });
    this.yeasts.splice(this.yeasts.indexOf(add_yeast), 1)
  }

  removeYeast(yeast_index): void {
    this.yeasts.push(this.used_yeasts[yeast_index])
    this.newYeastItem.yeast_relations.splice(yeast_index, 1);
    this.used_yeasts.splice(yeast_index, 1);
    this.yeasts.sort(function(a,b) {return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0); });
  }

  creationSubmit(form: any): void {
    this._yeastService.createYeast(this.newYeastItem)
      .subscribe((res) => {
        this.newYeastItem.id = JSON.parse(res._body).id;
        this.newYeastItem.user_id = JSON.parse(res._body).user_id;
        this.onYeastCreate.emit({yeast: this.newYeastItem});
        this.createModal.close();

        this.newYeastItem = {
          id: 0,
          user_id: 0,
          name: "",
          global: false,
          lab: "",
          product_id: "",
          yeast_type: "",
          form: "",
          flocculation: 0,
          min_attenuation: 0,
          max_attenuation: 0,
          min_temperature: 0,
          max_temperature: 0,
          cell_count: 100,
          description: "",
          recipe_count: 0,
          style_yeasts: [],
          yeast_relations: []
        };
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error adding the yeast, please try again later.");
        }
        console.error(error);
      });
  }

  open(newYeast) {
    this.createModal = this._modalService.open(newYeast, { size: 'lg' });
    this.yeast_style_collapse = false;
    this.yeast_relation_collapse = false;

    this._styleService.getStyles()
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
      .subscribe(styleData => {
          this.styles = styleData;
        },
        error => {
          console.error(error);
      });

    this._yeastService.getYeasts()
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
      .subscribe(yeastData => {
          this.yeasts = yeastData;
          this.used_yeasts = [];

          this.yeasts.some((yeast, i) => {
            if(yeast.id === this.newYeastItem.id) {
              this.yeasts.splice(i, 1);
              return true;
            }
          })

          this.newYeastItem.yeast_relations.forEach((relation) => {
            this.yeasts.some((yeast, i) => {
              if(relation.yeast_relation_id === yeast.id) {
                this.used_yeasts.push(this.yeasts[i])
                this.yeasts.splice(i, 1);
                return true;
              }
              return false;
            })
          })
        },
        error => {
          console.error(error);
      });
  }
}
