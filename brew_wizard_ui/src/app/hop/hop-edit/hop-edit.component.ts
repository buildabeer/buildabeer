import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHop } from '../hop';
import { HopService } from '../hop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-hop-edit',
  templateUrl: './hop-edit.component.html',
  styleUrls: ['./hop-edit.component.scss']
})
export class HopEditComponent implements OnInit {

  errorMessage = 'Loading...';

  editHopItem: IHop = {
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

  @Input()
  originalHopItem: IHop;

  @Output()
  uponHopEdit = new EventEmitter();

  editModal: NgbModalRef;

  constructor(private _router: Router, private _hopService:
    HopService, private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal, public _authService: AuthService) { }

  ngOnInit() { }

  editSubmit(form: any): void {
    this.editHopItem.aromas = this.aromas.join(', ');
    this._hopService.editHop(this.editHopItem.id, this.editHopItem)
      .subscribe((res) => {
        this.uponHopEdit.emit({hop: this.editHopItem});
        this.editModal.close();
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error processing your request, please try again later.');
        }
        console.error(error);
      });
  }

  onAddHop(add_hop): void {
    setTimeout(() => {
      this.selected_hop = null;
    });

    this.used_hops.push(add_hop);
    this.editHopItem.hop_relations.push({ id: null, hop_id: this.editHopItem.id, hop_relation_id: add_hop.id });
    this.hops.splice(this.hops.indexOf(add_hop), 1);
  }

  removeHop(hop_index): void {
    this.hops.push(this.used_hops[hop_index]);
    this.editHopItem.hop_relations.splice(hop_index, 1);
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

  open(editHop) {
    this.editHopItem = Object.assign({}, this.originalHopItem);
    this.aromas = this.editHopItem.aromas.split(', ');
    this.editModal = this._modalService.open(editHop, { size: 'lg' });
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
            if (hop.id === this.editHopItem.id) {
              this.hops.splice(i, 1);
              return true;
            }
          });

          this.editHopItem.hop_relations.forEach((relation) => {
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
