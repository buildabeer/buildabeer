import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IYeast } from '../yeast';
import { YeastService } from '../yeast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';
import { StyleService } from './../../style/style.service';
import { IStyle } from './../../style/style';

@Component({
  selector: 'app-yeast-edit',
  templateUrl: './yeast-edit.component.html',
  styleUrls: ['./yeast-edit.component.scss'],
  outputs: ['onYeastEdit']
})
export class YeastEditComponent implements OnInit {

  editYeastItem: IYeast = {
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
        yeast_relations: [],
        style_yeasts: []
      };

  errorMessage: string = "Loading..."

  styles: IStyle[] = [];
  used_styles: IStyle[] = [];
  selected_style: IStyle = null;
  yeast_style_collapse: boolean;

  yeasts: IYeast[] = [];
  used_yeasts: IYeast[] = [];
  selected_yeast: IYeast = null;
  yeast_relation_collapse: boolean;

  @Input()
  originalYeastItem: IYeast;

  @Output()
  onYeastEdit = new EventEmitter();

  editModal: NgbModalRef;

  constructor(private _router: Router, private _yeastService:
    YeastService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService,
    private _styleService: StyleService) { }

  ngOnInit() { }

  editSubmit(form: any): void {
    this._yeastService.editYeast(this.editYeastItem.id, this.editYeastItem)
      .subscribe((res) => {
        this.onYeastEdit.emit({yeast: this.editYeastItem});
        this.editModal.close();
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error processing your request, please try again later.");
        }
        console.error(error);
      });
  }

  onAddStyle(add_style): void {
    setTimeout(() => {
      this.selected_style = null;
    });

    this.used_styles.push(add_style);
    this.editYeastItem.style_yeasts.push({ id: null, style_id: add_style.id, yeast_id: this.editYeastItem.id });
    this.styles.splice(this.styles.indexOf(add_style), 1)
  }

  removeStyle(style_index): void {
    this.styles.push(this.used_styles[style_index])
    this.editYeastItem.style_yeasts.splice(style_index, 1);
    this.used_styles.splice(style_index, 1);
    this.styles.sort(function(a,b) {return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0); });
  }

  onAddYeast(add_yeast): void {
    setTimeout(() => {
      this.selected_yeast = null;
    });

    this.used_yeasts.push(add_yeast);
    this.editYeastItem.yeast_relations.push({ id: null, yeast_id: this.editYeastItem.id, yeast_relation_id: add_yeast.id });
    this.yeasts.splice(this.yeasts.indexOf(add_yeast), 1)
  }

  removeYeast(yeast_index): void {
    this.yeasts.push(this.used_yeasts[yeast_index])
    this.editYeastItem.yeast_relations.splice(yeast_index, 1);
    this.used_yeasts.splice(yeast_index, 1);
    this.yeasts.sort(function(a,b) {return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0); });
  }

  open(editYeast) {
    this.editYeastItem = Object.assign({}, this.originalYeastItem)
    this.editModal = this._modalService.open(editYeast, { size: 'lg' });
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
          this.used_styles = [];

          this.editYeastItem.style_yeasts.forEach((yeast_style) => {
            this.styles.some((style, i) => {
              if(yeast_style.style_id === style.id) {
                this.used_styles.push(this.styles[i])
                this.styles.splice(i, 1);
                return true;
              }
              return false;
            })
          })
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
            if(yeast.id === this.editYeastItem.id) {
              this.yeasts.splice(i, 1);
              return true;
            }
          })

          this.editYeastItem.yeast_relations.forEach((relation) => {
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
