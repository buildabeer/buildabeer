import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { YeastService } from '../../yeast/yeast.service';
import { IYeast } from '../../yeast/yeast';

@Component({
  selector: 'app-yeast-select',
  templateUrl: './yeast-select.component.html',
  styleUrls: ['./yeast-select.component.scss']
})
export class YeastSelectComponent implements OnInit {

  @Input()
  yeastOptions: IYeast[];

  @Input()
  styleId: number;

  @Output()
  selectedYeast = new EventEmitter();

  selected_yeast: IYeast[] = [];
  yeastSelectModal: NgbModalRef;
  lastSort = 'name';
  search = '';
  filterLab = 'All';
  filterType = 'All';
  yeastLabs: string[];
  suggestYeast = false;

  constructor(private _yeastService: YeastService, private _modalService: NgbModal) { }

  ngOnInit() {
  }

  addYeastSubmit(form: any): void {
    this.selectedYeast.emit({yeast: this.selected_yeast});
    this.yeastSelectModal.close();
  }

  open(addYeast) {
    this.search = '';
    this.filterLab = 'All';
    this.filterType = 'All';
    this.selected_yeast = [];
    this.yeastLabs = [...Array.from(new Set(this.yeastOptions.map(item => item.lab)))];
    this.yeastSelectModal = this._modalService.open(addYeast, { size: 'lg' });
  }

  selectRow(row: IYeast): void {
    for (let i = this.selected_yeast.length; i >= 0; i--) {
      if (this.selected_yeast[i] === row) {
        this.selected_yeast.splice(i, 1);
        return;
      }
    }

    this.selected_yeast.push(row);
  }

  matchesStyle(associations): boolean {
    let found = false;
    associations.forEach((association) => {
      if (association.style_id === this.styleId) {
        found = true;
      }
    });

    return found;
  }

  filteredYeastOptions(): IYeast[] {
    let valid_yeast = this.yeastOptions;

    if (this.filterType !== 'All') {
      valid_yeast = valid_yeast.filter(m => m.yeast_type === this.filterType);
    }
    if (this.filterLab !== 'All') {
      valid_yeast = valid_yeast.filter(m => m.lab === this.filterLab);
    }

    valid_yeast = valid_yeast.filter(m => m.name.match(new RegExp(this.search, 'i')));

    if (this.suggestYeast) {
      valid_yeast = valid_yeast.filter(m => this.matchesStyle(m.style_yeasts));
    }

    return valid_yeast;
  }

  sortBy(category: string): void {
    if (category !== this.lastSort) {
      switch (category) {
        case 'name':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'lab':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.lab < b.lab) {
              return -1;
            } else if (a.lab > b.lab) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'prod_id':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.product_id < b.product_id) {
              return -1;
            } else if (a.product_id > b.product_id) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'type':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.yeast_type < b.yeast_type) {
              return -1;
            } else if (a.yeast_type > b.yeast_type) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'form':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.form < b.form) {
              return -1;
            } else if (a.form > b.form) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'attenuation':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            return (a.min_attenuation + (a.max_attenuation - a.min_attenuation) / 2) - (b.min_attenuation + (b.max_attenuation - b.min_attenuation) / 2);
          });
          break;
      }
      this.lastSort = category;
    } else {
      switch (category) {
        case 'name':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.name < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'lab':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.lab < b.lab) {
              return 1;
            } else if (a.lab > b.lab) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'prod_id':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.product_id < b.product_id) {
              return 1;
            } else if (a.product_id > b.product_id) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'type':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.yeast_type < b.yeast_type) {
              return 1;
            } else if (a.yeast_type > b.yeast_type) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'form':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            if (a.form < b.form) {
              return 1;
            } else if (a.form > b.form) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'attenuation':
          this.yeastOptions = this.yeastOptions.sort(function(a, b) {
            return (b.min_attenuation + (b.max_attenuation - b.min_attenuation) / 2) - (a.min_attenuation + (a.max_attenuation - a.min_attenuation) / 2);
          });
          break;
      }
      this.lastSort = '';
    }
  }
}
