import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { YeastService } from '../yeast.service';

@Component({
  selector: 'app-yeast-relations',
  templateUrl: './yeast-relations.component.html',
  styleUrls: ['./yeast-relations.component.scss']
})
export class YeastRelationsComponent implements OnInit {

  errorMessage = 'An error has occurred.';
  yeast_relations = [];
  yeast_names = [];
  name_complete = false;
  relations_complete = false;
  relationship_dictionary = [];
  key_index = {};

  constructor(private _yeastService: YeastService,
    public _authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this._yeastService.getYeastRelations()
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
          this.yeast_relations = yeastData;
          this.name_complete = true;
          this.set_dictionary();
          this.errorMessage = 'Data missing, please try again later.';
        },
        error => {
          this.name_complete = true;
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
          this.relations_complete = true;
          this.yeast_names = yeastData;
          this.set_names();
          this.errorMessage = 'Data missing, please try again later.';
        },
        error => {
          this.relations_complete = true;
          this.errorMessage = 'Problem with the service. Please try against later.';
          console.error(error);
      });
  }

  alter_relationship(e, first_position, second_position) {
    let first_id: number = this.yeast_names[first_position].id;
    let second_id: number = this.yeast_names[second_position].id;

    if (first_id === second_id || !this._authService.userSignedIn()) {
      return;
    } else if (this.relationship_dictionary[first_position][second_position] === 'loading') {
      window.alert('An action is already in process for this relationship.');
    } else if (this.relationship_dictionary[first_position][second_position] === 'set') {
      this.set_dictionary_position(first_position, second_position, 'loading');
      this._yeastService.deleteYeastRelation(first_id, second_id)
        .subscribe((yeastData) => {
          this.set_dictionary_position(first_position, second_position, 'none');
        }, (error) => {
          window.alert('Error in deleting relationship between ' +
            this.yeast_names[first_position].name + ' and ' +
            this.yeast_names[second_position].name + '.\n' + error.error.errors);
          this.set_dictionary_position(first_position, second_position, 'set');
          console.error(error);
        });
    } else {
      this.set_dictionary_position(first_position, second_position, 'loading');
      this._yeastService.createYeastRelation({ yeast_id: first_id, yeast_relation_id: second_id })
        .subscribe(yeastData => {
          this.set_dictionary_position(first_position, second_position, 'set');
        },
        error => {
          window.alert('Error in adding relationship between ' +
            this.yeast_names[first_position].name + ' and ' +
            this.yeast_names[second_position].name + '.\n' + error.error.errors);
          this.set_dictionary_position(first_position, second_position, 'none');
          console.error(error);
        });
    }
  }

  set_dictionary_position(first_position, second_position, keyword) {
    this.relationship_dictionary[first_position][second_position] = keyword;
    this.relationship_dictionary[second_position][first_position] = keyword;
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
      this.key_index[yeast.id] = i;
    });
  }

  set_names() {
    for (let i = 0; i < this.yeast_names.length; i++) {
      this.relationship_dictionary[i] = [];
      for (let i2 = 0; i2 < this.yeast_names.length; i2++) {
        if (i === i2) {
          this.relationship_dictionary[i][i2] = 'invalid';
        } else {
          this.relationship_dictionary[i][i2] = 'none';
        }
      }
    }

    this.set_key_index();
    this.set_dictionary();
  }

  set_dictionary() {
    if (this.name_complete && this.relations_complete) {
      this.yeast_relations.forEach((relation) => {
        this.relationship_dictionary[this.key_index[relation.yeast_id]][this.key_index[relation.yeast_relation_id]] = 'set';
      });
    }
  }
}
