import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HopService } from '../../hop/hop.service';
import { IHop } from '../../hop/hop';

@Component({
  selector: 'app-hop-select',
  templateUrl: './hop-select.component.html',
  styleUrls: ['./hop-select.component.scss']
})
export class HopSelectComponent implements OnInit {

  @Input()
  hopOptions: IHop[];

  @Output()
  selectedHop = new EventEmitter();

  selected_hops: IHop[] = [];
  hopSelectModal: NgbModalRef;
  lastSort = 'name';
  search = '';
  filterOrigin = 'All';
  filterType = 'All';
  hopOrigins: string[];
  fullAromaList: string[] = [];
  aromaCheckbox: boolean[] = [];
  aromaSearch = '';

  constructor(private _hopService: HopService, private _modalService: NgbModal) { }

  ngOnInit() {
  }

  addHopSubmit(form: any): void {
    this.selectedHop.emit({hops: this.selected_hops});
    this.hopSelectModal.close();
  }

  open(addHop) {
    this.search = '';
    this.filterType = 'All';
    this.filterOrigin = 'All';
    this.selected_hops = [];
    this.hopOrigins = [...Array.from(new Set(this.hopOptions.map(item => item.origin)))];
    this.hopSelectModal = this._modalService.open(addHop, { size: 'lg' });
    this.fullAromaList = this.getFullAromaList();
    console.log(this.fullAromaList);
    this.aromaCheckbox.fill(false, 0, this.fullAromaList.length - 1);
  }

  selectRow(row: IHop): void {
    for (let i = this.selected_hops.length; i >= 0; i--) {
      if (this.selected_hops[i] === row) {
        this.selected_hops.splice(i, 1);
        return;
      }
    }

    this.selected_hops.push(row);
  }

  filteredHopOptions(): IHop[] {
    let valid_hops = this.hopOptions;

    if (this.filterType !== 'All') {
      valid_hops = valid_hops.filter(h => h.hop_type === this.filterType);
    }
    if (this.filterOrigin !== 'All') {
      valid_hops = valid_hops.filter(h => h.origin === this.filterOrigin);
    }
    this.aromaCheckbox.forEach((checkbox, i) => {
      if (checkbox) {
        valid_hops = valid_hops.filter(h => h.aromas && h.aromas.split(', ').includes(this.fullAromaList[i]));
      }
    });
    return valid_hops.filter(h => h.name.match(new RegExp(this.search, 'i')));
  }

  aromaMatch(aroma: string) {
    return aroma.match(new RegExp(this.aromaSearch, 'i'));
  }

  aromaIndex(aroma: string): number {
    return this.fullAromaList.indexOf(aroma);
  }

  getFullAromaList(): string[] {
    const aroma_list: string[] = [];
    this.hopOptions.forEach((hop) => {
      if (hop.aromas && hop.aromas.length > 0) {
        hop.aromas.split(', ').forEach((aroma) => {
          if (!aroma_list.includes(aroma)) {
            aroma_list.push(aroma);
          }
        });
      }
    });

    return aroma_list.sort();
  }

  aromaList(): string[] {
    const aroma_list: string[] = [];
    this.filteredHopOptions().forEach((hop) => {
      if (hop.aromas && hop.aromas.length > 0) {
        hop.aromas.split(', ').forEach((aroma) => {
          if (!aroma_list.includes(aroma)) {
            aroma_list.push(aroma);
          }
        });
      }
    });

    return aroma_list.sort();
  }

  sortBy(category: string): void {
    if (category !== this.lastSort) {
      switch (category) {
        case 'name':
          this.hopOptions = this.hopOptions.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'type':
          this.hopOptions = this.hopOptions.sort(function(a, b) {
            if (a.hop_type < b.hop_type) {
              return -1;
            } else if (a.hop_type > b.hop_type) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'origin':
          this.hopOptions = this.hopOptions.sort(function(a, b) {
            if (a.origin < b.origin) {
              return -1;
            } else if (a.origin > b.origin) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'alpha':
          this.hopOptions = this.hopOptions.sort(function(a, b) {
            return a.alpha - b.alpha;
          });
          break;
      }
      this.lastSort = category;
    } else {
      switch (category) {
        case 'name':
          this.hopOptions = this.hopOptions.sort(function(a, b) {
            if (a.name < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'type':
          this.hopOptions = this.hopOptions.sort(function(a, b) {
            if (a.hop_type < b.hop_type) {
              return 1;
            } else if (a.hop_type > b.hop_type) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'origin':
          this.hopOptions = this.hopOptions.sort(function(a, b) {
            if (a.origin < b.origin) {
              return 1;
            } else if (a.origin > b.origin) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'alpha':
          this.hopOptions = this.hopOptions.sort(function(a, b) {
            return b.alpha - a.alpha;
          });
          break;
      }
      this.lastSort = '';
    }
  }
}
