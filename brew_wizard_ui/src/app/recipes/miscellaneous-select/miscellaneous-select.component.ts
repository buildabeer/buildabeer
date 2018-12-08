import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MiscellaneousService } from '../../miscellaneous/miscellaneous.service';
import { IMiscellaneous } from '../../miscellaneous/miscellaneous';

@Component({
  selector: 'app-miscellaneous-select',
  templateUrl: './miscellaneous-select.component.html',
  styleUrls: ['./miscellaneous-select.component.scss']
})
export class MiscellaneousSelectComponent implements OnInit {

  @Input()
  miscellaneousOptions: IMiscellaneous[];

  @Output()
  selectedMiscellaneous = new EventEmitter();

  selected_miscellaneous: IMiscellaneous[] = [];
  miscellaneousSelectModal: NgbModalRef;
  lastSort = 'name';
  search = '';
  filterUsage = 'All';
  filterType = 'All';

  misc_types: string[] = ['Spice', 'Fining', 'Herb', 'Flavor', 'Other'];
  misc_usages: string[] = ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling'];

  constructor(private _miscellaneousService: MiscellaneousService, private _modalService: NgbModal) { }

  ngOnInit() {
  }

  addMiscellaneousSubmit(form: any): void {
    this.selectedMiscellaneous.emit({miscellaneous: this.selected_miscellaneous});
    this.miscellaneousSelectModal.close();
  }

  open(addMiscellaneous) {
    this.search = '';
    this.filterType = 'All';
    this.filterUsage = 'All';
    this.selected_miscellaneous = [];
    this.miscellaneousSelectModal = this._modalService.open(addMiscellaneous, { size: 'lg' });
  }

  selectRow(row: IMiscellaneous): void {
    for (let i = this.selected_miscellaneous.length; i >= 0; i--) {
      if (this.selected_miscellaneous[i] === row) {
        this.selected_miscellaneous.splice(i, 1);
        return;
      }
    }

    this.selected_miscellaneous.push(row);
  }

  filteredMiscellaneousOptions(): IMiscellaneous[] {
    let valid_miscellaneous = this.miscellaneousOptions;

    if (this.filterType !== 'All') {
      valid_miscellaneous = valid_miscellaneous.filter(h => h.miscellaneous_type === this.filterType);
    }
    if (this.filterUsage !== 'All') {
      valid_miscellaneous = valid_miscellaneous.filter(h => h.usage === this.filterUsage);
    }
    return valid_miscellaneous.filter(h => h.name.match(new RegExp(this.search, 'i')));
  }

  sortBy(category: string): void {
    if (category !== this.lastSort) {
      switch (category) {
        case 'name':
          this.miscellaneousOptions = this.miscellaneousOptions.sort(function(a, b) {
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
          this.miscellaneousOptions = this.miscellaneousOptions.sort(function(a, b) {
            if (a.miscellaneous_type < b.miscellaneous_type) {
              return -1;
            } else if (a.miscellaneous_type > b.miscellaneous_type) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case 'usage':
          this.miscellaneousOptions = this.miscellaneousOptions.sort(function(a, b) {
            if (a.usage < b.usage) {
              return -1;
            } else if (a.usage > b.usage) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
      }
      this.lastSort = category;
    } else {
      switch (category) {
        case 'name':
          this.miscellaneousOptions = this.miscellaneousOptions.sort(function(a, b) {
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
          this.miscellaneousOptions = this.miscellaneousOptions.sort(function(a, b) {
            if (a.miscellaneous_type < b.miscellaneous_type) {
              return 1;
            } else if (a.miscellaneous_type > b.miscellaneous_type) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'usage':
          this.miscellaneousOptions = this.miscellaneousOptions.sort(function(a, b) {
            if (a.usage < b.usage) {
              return 1;
            } else if (a.usage > b.usage) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
      }
      this.lastSort = '';
    }
  }
}
