import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IHop } from '../hop';
import { HopService } from '../hop.service';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hop-new',
  templateUrl: './hop-new.component.html',
  styleUrls: ['./hop-new.component.scss']
})
export class HopNewComponent implements OnInit {

  newHopItem: IHop = {
        id: 0,
        user_id: 0,
        name: '',
        global: false,
        origin: '',
        hop_type: '',
        alpha: 0,
        beta: 0,
        description: '',
        recipe_count: 0,
        hop_relations: [],
        aromas: ''
      };

  aromas: string[] = [];
  newAroma = '';
  hops: IHop[] = [];
  used_hops: IHop[] = [];
  selected_hop: IHop = null;
  hop_relation_collapse: boolean;

  description: string;

  @Output()
  uponHopCreate = new EventEmitter();

  createModal: NgbModalRef;

  constructor(private _hopService: HopService,
    public _authService: AuthService, private _router: Router,
    private _modalService: NgbModal) { }

  ngOnInit() {

  }

  creationSubmit(form: any): void {
    this.newHopItem.aromas = this.aromas.join(', ');
    this._hopService.createHop(this.newHopItem)
      .subscribe((res) => {
        this.newHopItem.id = JSON.parse(res._body).id;
        this.newHopItem.user_id = JSON.parse(res._body).user_id;
        this.uponHopCreate.emit({hop: this.newHopItem});
        this.createModal.close();

        this.newHopItem = {
          id: 0,
          user_id: 0,
          name: '',
          global: false,
          origin: '',
          hop_type: '',
          alpha: 0,
          beta: 0,
          description: '',
          recipe_count: 0,
          hop_relations: [],
          aromas: ''
        };
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error adding the hop, please try again later.');
        }
        console.error(error);
      });
  }

  onAddHop(add_hop): void {
    setTimeout(() => {
      this.selected_hop = null;
    });

    this.used_hops.push(add_hop);
    this.newHopItem.hop_relations.push({ id: null, hop_id: this.newHopItem.id, hop_relation_id: add_hop.id });
    this.hops.splice(this.hops.indexOf(add_hop), 1);
  }

  removeHop(hop_index): void {
    this.hops.push(this.used_hops[hop_index]);
    this.newHopItem.hop_relations.splice(hop_index, 1);
    this.used_hops.splice(hop_index, 1);
    this.hops.sort(function(a, b) {return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0); });
  }

  removeAroma(index): void {
    this.aromas.splice(index, 1);
  }

  addAroma(): void {
    if (this.newAroma.length > 0) {
      if (!this.aromas.includes(this.newAroma)) {
        this.aromas.push(this.newAroma);
      }
      this.newAroma = '';
    }
  }

  commaCheck(event): void {
    this.newAroma = this.newAroma.replace(/,/g, '');
    if (event[event.length - 1] === ',') {
      if (this.newAroma.length > 1 && !this.aromas.includes(this.newAroma)) {
        this.aromas.push(this.newAroma);
      }
      this.newAroma = '';
    }
  }

  open(newHop) {
    this.createModal = this._modalService.open(newHop, { size: 'lg' });
    this.hop_relation_collapse = false;

    this._hopService.getHops()
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
          this.hops = hopData;
          this.used_hops = [];

          this.hops.some((hop, i) => {
            if (hop.id === this.newHopItem.id) {
              this.hops.splice(i, 1);
              return true;
            }
          });

          this.newHopItem.hop_relations.forEach((relation) => {
            this.hops.some((hop, i) => {
              if (relation.hop_relation_id === hop.id) {
                this.used_hops.push(this.hops[i]);
                this.hops.splice(i, 1);
                return true;
              }
              return false;
            });
          });
        },
        error => {
          console.error(error);
      });
  }
}
