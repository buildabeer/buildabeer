import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MaltService } from '../../malt/malt.service'
import { IMalt } from '../../malt/malt'

@Component({
  selector: 'app-malt-select',
  templateUrl: './malt-select.component.html',
  styleUrls: ['./malt-select.component.scss']
})
export class MaltSelectComponent implements OnInit {

  @Input()
  maltOptions: IMalt[]

  @Input()
  maltTypes: string[]

  @Output()
  selectedMalt = new EventEmitter();

  selected_malts: IMalt[] = [];
  maltSelectModal: NgbModalRef;
  lastSort: string = "name";
  search: string = '';
  filterBase: string = 'any';
  filterType: string = 'any';

  constructor(private _maltService: MaltService, private _modalService: NgbModal) { }

  ngOnInit() {
  }

  addMaltSubmit(form: any): void {
    this.selectedMalt.emit({malts: this.selected_malts});
    this.maltSelectModal.close();
  }

  open(addMalt) {
    this.search = '';
    this.filterBase = 'any';
    this.filterType = 'any';
    this.selected_malts = [];
    this.maltSelectModal = this._modalService.open(addMalt, { size: 'lg' })
  }

  selectRow(row: IMalt): void {
    for(var i=this.selected_malts.length; i >= 0; i--) {
      if (this.selected_malts[i] === row) {
        this.selected_malts.splice(i, 1)
        return
      }
    }

    this.selected_malts.push(row)
  }

  filteredMaltOptions(): IMalt[] {
    var valid_malts = this.maltOptions;

    if(this.filterType !== 'any') {
      valid_malts = valid_malts.filter(m => m.malt_type_id.toString() === this.filterType)
    }
    if(this.filterBase !== 'any') {
      if(this.filterBase === 'base') {
        valid_malts = valid_malts.filter(m => m.diastatic_power >= 85)
      } else {
        valid_malts = valid_malts.filter(m => m.diastatic_power < 85)
      }
    }
    return valid_malts.filter(m => m.name.match(new RegExp(this.search, "i")));
  }

  sortBy(category: string): void {
    if(category !== this.lastSort) {
      switch(category) {
        case 'name':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          })
          break;
        case 'type':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            return a.malt_type_id - b.malt_type_id;
          })
          break;
        case 'color':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            return a.color - b.color;
          })
          break;
        case 'gravity':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            return a.malt_yield - b.malt_yield;
          })
          break;
        case 'diastatic':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            return a.diastatic_power - b.diastatic_power;
          })
          break;
      }
      this.lastSort = category;
    } else {
      switch(category) {
        case 'name':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            if (b.name < a.name) {
              return -1;
            } else if (b.name > a.name) {
              return 1;
            } else {
              return 0;
            }
          })
          break;
        case 'type':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            return b.malt_type_id - a.malt_type_id;
          })
          break;
        case 'color':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            return b.color - a.color;
          })
          break;
        case 'gravity':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            return b.malt_yield - a.malt_yield;
          })
          break;
        case 'diastatic':
          this.maltOptions = this.maltOptions.sort(function(a, b) {
            return b.diastatic_power - a.diastatic_power;
          })
          break;
      }
      this.lastSort = '';
    }
  }
}
