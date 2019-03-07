import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { HopService } from '../hop.service';

@Component({
  selector: 'app-hop-relations',
  templateUrl: './hop-relations.component.html',
  styleUrls: ['./hop-relations.component.scss']
})
export class HopRelationsComponent implements OnInit {

  errorMessage = 'An error has occurred.';
  hop_relations = [];
  hop_names = [];
  name_complete = false;
  relations_complete = false;
  relationship_dictionary = [];
  key_index = {};

  constructor(private _hopService: HopService,
    public _authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this._hopService.getHopRelations()
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
      .subscribe(hopData => {
          this.hop_relations = hopData;
          this.name_complete = true;
          this.set_dictionary();
          this.errorMessage = 'Data missing, please try again later.';
        },
        error => {
          this.name_complete = true;
          this.errorMessage = 'Problem with the service. Please try again later.';
          console.error(error);
      });

    this._hopService.getHopNames()
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
      .subscribe(hopData => {
          this.relations_complete = true;
          this.hop_names = hopData;
          this.set_names();
          this.errorMessage = 'Data missing, please try again later.';
        },
        error => {
          this.relations_complete = true;
          this.errorMessage = 'Problem with the service. Please try again later.';
          console.error(error);
      });
  }

  alter_relationship(first_position, second_position) {
    let first_id: number = this.hop_names[first_position].id;
    let second_id: number = this.hop_names[second_position].id;

    if (first_id === second_id || !this._authService.userSignedIn()) {
      return;
    } else if (this.relationship_dictionary[first_position][second_position] === 'loading') {
      window.alert('An action is already in process for this relationship.');
    } else if (this.relationship_dictionary[first_position][second_position] === 'set') {
      this.set_dictionary_position(first_position, second_position, 'loading');
      this._hopService.deleteHopRelation(first_id, second_id)
        .subscribe((hopData) => {
          this.set_dictionary_position(first_position, second_position, 'none');
        }, (error) => {
          window.alert('Error in deleting relationship between ' +
            this.hop_names[first_position].name + ' and ' +
            this.hop_names[second_position].name + '.\n' + error.error.errors);
          this.set_dictionary_position(first_position, second_position, 'set');
          console.error(error);
        });
    } else {
      this.set_dictionary_position(first_position, second_position, 'loading');
      this._hopService.createHopRelation({ hop_id: first_id, hop_relation_id: second_id })
        .subscribe(hopData => {
          this.set_dictionary_position(first_position, second_position, 'set');
        },
        error => {
          window.alert('Error in adding relationship between ' +
            this.hop_names[first_position].name + ' and ' +
            this.hop_names[second_position].name + '.\n' + error.error.errors);
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
      return 'blue fas fa-spinner fa-pulse';
    }

    return '';
  }

  set_key_index() {
    this.hop_names.forEach((hop, i) => {
      this.key_index[hop.id] = i;
    });
  }

  set_names() {
    for (let i = 0; i < this.hop_names.length; i++) {
      this.relationship_dictionary[i] = [];
      for (let i2 = 0; i2 < this.hop_names.length; i2++) {
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
      this.hop_relations.forEach((relation) => {
        this.relationship_dictionary[this.key_index[relation.hop_id]][this.key_index[relation.hop_relation_id]] = 'set';
      });
    }
  }
}
