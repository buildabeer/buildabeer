import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { YeastService } from '../../yeast/yeast.service';
import { StyleService } from '../style.service';

@Component({
  selector: 'app-yeast-relations',
  templateUrl: './style-yeast-relations.component.html',
  styleUrls: ['./style-yeast-relations.component.scss']
})
export class StyleYeastRelationsComponent implements OnInit {

  errorMessage = 'An error has occurred.';
  style_yeast_relations = [];
  yeast_names = [];
  style_names = [];
  style_name_complete = false;
  yeast_name_complete = false;
  relations_complete = false;
  relationship_dictionary = [];
  yeast_key_index = {};
  style_key_index = {};

  constructor(private _yeastService: YeastService, private _styleService: StyleService,
    public _authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this._styleService.getStyleYeastRelations()
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
      .subscribe(syData => {
          this.style_yeast_relations = syData;
          this.relations_complete = true;
          this.set_dictionary();
          this.errorMessage = 'Data missing, please try again later.';
        },
        error => {
          this.relations_complete = true;
          this.errorMessage = 'Problem with the service. Please try against later.';
          console.error(error);
      });

    this._yeastService.getYeastNames()
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
      .subscribe(yeastData => {
          this.yeast_name_complete = true;
          this.yeast_names = yeastData;
          this.set_names();
          this.errorMessage = 'Data missing, please try again later.';
        },
        error => {
          this.yeast_name_complete = true;
          this.errorMessage = 'Problem with the service. Please try against later.';
          console.error(error);
      });

    this._styleService.getStyleNames()
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
      .subscribe(styleData => {
          this.style_name_complete = true;
          this.style_names = styleData;
          this.set_names();
          this.errorMessage = 'Data missing, please try again later.';
        },
        error => {
          this.style_name_complete = true;
          this.errorMessage = 'Problem with the service. Please try against later.';
          console.error(error);
      });
  }

  alter_relationship(first_position, second_position) {
    let first_id: number = this.style_names[first_position].id;
    let second_id: number = this.yeast_names[second_position].id;

    if (!this._authService.userSignedIn()) {
      return;
    } else if (this.relationship_dictionary[first_position][second_position] === 'loading') {
      window.alert('An action is already in process for this relationship.');
    } else if (this.relationship_dictionary[first_position][second_position] === 'set') {
      this.set_dictionary_position(first_position, second_position, 'loading');
      this._styleService.deleteStyleYeastRelation(first_id, second_id)
        .subscribe((yeastData) => {
          this.set_dictionary_position(first_position, second_position, 'none');
        }, (error) => {
          window.alert('Error in deleting relationship between ' +
            this.style_names[first_position].name + ' and ' +
            this.yeast_names[second_position].name + '.\n' + error.error.errors);
          this.set_dictionary_position(first_position, second_position, 'set');
          console.error(error);
        });
    } else {
      this.set_dictionary_position(first_position, second_position, 'loading');
      this._styleService.createStyleYeastRelation({ style_id: first_id, yeast_id: second_id })
        .subscribe(yeastData => {
          this.set_dictionary_position(first_position, second_position, 'set');
        },
        error => {
          window.alert('Error in adding relationship between ' +
            this.style_names[first_position].name + ' and ' +
            this.yeast_names[second_position].name + '.\n' + error.error.errors);
          this.set_dictionary_position(first_position, second_position, 'none');
          console.error(error);
        });
    }
  }

  set_dictionary_position(first_position, second_position, keyword) {
    this.relationship_dictionary[first_position][second_position] = keyword;
  }

  interpret_keyword(keyword) {
    if (keyword === 'invalid') {
      return 'red fas fa-times-circle';
    } else if (keyword === 'set') {
      return 'green fas fa-check-circle';
    } else if (keyword === 'loading') {
      return 'blue fas fa-circle-notch';
    }

    return '';
  }

  set_key_index() {
    this.yeast_names.forEach((yeast, i) => {
      this.yeast_key_index[yeast.id] = i;
    });

    this.style_names.forEach((yeast, i) => {
      this.style_key_index[yeast.id] = i;
    });
  }

  set_names() {
    if (this.yeast_name_complete && this.style_name_complete) {
      for (let i = 0; i < this.style_names.length; i++) {
        this.relationship_dictionary[i] = [];
        for (let i2 = 0; i2 < this.yeast_names.length; i2++) {
          this.relationship_dictionary[i][i2] = 'none';
        }
      }

      this.set_key_index();
      this.set_dictionary();
    }
  }

  set_dictionary() {
    if (this.style_name_complete && this.yeast_name_complete && this.relations_complete) {
      this.style_yeast_relations.forEach((relation) => {
        // console.log('-------')
        // console.log(relation)
        // console.log("style: " + this.style_key_index[relation.style_id])
        this.relationship_dictionary[this.style_key_index[relation.style_id]][this.yeast_key_index[relation.yeast_id]] = 'set';
        // console.log('-------')
      });

      console.log(this.relationship_dictionary);
    }
  }
}
