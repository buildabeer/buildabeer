import { AuthService } from '../../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { IMiscellaneous } from '../miscellaneous';
import { MiscellaneousService } from '../miscellaneous.service';

@Component({
  selector: 'app-miscellaneous-list',
  templateUrl: './miscellaneous-list.component.html',
  styleUrls: ['./miscellaneous-list.component.scss']
})
export class MiscellaneousListComponent implements OnInit {

  miscellaneous: IMiscellaneous[] = [];
  displayedMiscellaneous: IMiscellaneous[] = [];
  search = '';
  title = 'Miscellaneous';
  selectedMiscellaneousCountDropdown = 'All';
  selectedMiscellaneousTypeDropdown = '0';
  selectedMiscellaneousUsageDropdown = '0';
  errorMessage = 'Loading data...';
  page = 1;
  pageText = 1;

  misc_types: string[] = ['Spice', 'Fining', 'Herb', 'Flavor', 'Other'];
  misc_usages: string[] = ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling'];

  constructor(private _miscellaneousService: MiscellaneousService,
    public _authService: AuthService) { }

  ngOnInit() {

    this._miscellaneousService.getMiscellanies()
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
      .subscribe(miscellaneousData => {
          this.miscellaneous = miscellaneousData;
          this.displayedMiscellaneous = miscellaneousData;
          this.errorMessage = 'No data found.';
        },
        error => {
          this.errorMessage = 'Problem with the service. Please try against later.';
          console.error(error);
      });
  }

  filterMiscellaneous(resetPage = true): void {
    if (resetPage) {
      this.page = 1;
      this.pageText = 1;
    }

    this.displayedMiscellaneous = this.miscellaneous;

    if (this.selectedMiscellaneousCountDropdown !== 'All') {
      this.displayedMiscellaneous =  this.displayedMiscellaneous.filter(m => (m.global &&
        this.selectedMiscellaneousCountDropdown === 'Global') || (!m.global &&
        this.selectedMiscellaneousCountDropdown === 'Local'));
    }

    if (this.selectedMiscellaneousTypeDropdown !== '0') {
      this.displayedMiscellaneous = this.displayedMiscellaneous
        .filter(m => (m.miscellaneous_type === this.selectedMiscellaneousTypeDropdown || m.miscellaneous_type === 'Both'));
    }

    if (this.selectedMiscellaneousUsageDropdown !== '0') {
      this.displayedMiscellaneous = this.displayedMiscellaneous
        .filter(m => (m.usage === this.selectedMiscellaneousUsageDropdown));
    }
  }

  searchedMiscellaneous(): IMiscellaneous[] {
    return this.displayedMiscellaneous
      .filter(m => m.name.match(new RegExp(this.search, 'i')));
  }

  trackByMiscellaneousName(index: number, miscellaneous: any): string {
    return miscellaneous.name;
  }

  onPageChange(): void {
    if (this.page > this.getPageCount()) {
      this.page = this.getPageCount();
    } else if (this.page < 1) {
      this.page = 1;
    }
    this.pageText = this.page;
  }

  getPageCount(): number {
    return Math.ceil(this.searchedMiscellaneous().length / 20) > 0 ?
      Math.ceil(this.searchedMiscellaneous().length / 20) : 1;
  }

  getTypeFilteredMiscellaneousCount(searchValue: string): number {
    let filteredMiscellaneous: IMiscellaneous[];

    filteredMiscellaneous = this.miscellaneous
      .filter(m => m.name.match(new RegExp(this.search, 'i')));


    if (this.selectedMiscellaneousCountDropdown !== 'All') {
      filteredMiscellaneous =  filteredMiscellaneous.filter(m => (m.global &&
        this.selectedMiscellaneousCountDropdown === 'Global') || (!m.global &&
        this.selectedMiscellaneousCountDropdown === 'Local'));
    }

    if (this.selectedMiscellaneousUsageDropdown !== '0') {
      filteredMiscellaneous = filteredMiscellaneous
        .filter(m => (m.usage === this.selectedMiscellaneousUsageDropdown));
    }

    if (searchValue === '0') {
      return filteredMiscellaneous.length;
    }
    return filteredMiscellaneous
      .filter(m => m.miscellaneous_type === searchValue || m.miscellaneous_type === 'Both').length;
  }

  getUsageFilteredMiscellaneousCount(searchValue: string): number {
    let filteredMiscellaneous: IMiscellaneous[];

    filteredMiscellaneous = this.miscellaneous
      .filter(m => m.name.match(new RegExp(this.search, 'i')));


    if (this.selectedMiscellaneousCountDropdown !== 'All') {
      filteredMiscellaneous =  filteredMiscellaneous.filter(m => (m.global &&
        this.selectedMiscellaneousCountDropdown === 'Global') || (!m.global &&
        this.selectedMiscellaneousCountDropdown === 'Local'));
    }

    if (this.selectedMiscellaneousTypeDropdown !== '0') {
      this.displayedMiscellaneous = this.displayedMiscellaneous
        .filter(m => (m.miscellaneous_type === this.selectedMiscellaneousTypeDropdown || m.miscellaneous_type === 'Both'));
    }

    if (searchValue === '0') {
      return filteredMiscellaneous.length;
    }
    return filteredMiscellaneous
      .filter(m => m.usage === searchValue).length;
  }

  getGlobalFilteredMiscellaneousCount(searchValue: number): number {
    let filteredMiscellaneous: IMiscellaneous[];

    filteredMiscellaneous = this.miscellaneous
      .filter(m => m.name.match(new RegExp(this.search, 'i')));

    if (this.selectedMiscellaneousTypeDropdown !== '0') {
      filteredMiscellaneous = filteredMiscellaneous
        .filter(m => (m.miscellaneous_type === this.selectedMiscellaneousTypeDropdown || m.miscellaneous_type === 'Both'));
    }

    if (this.selectedMiscellaneousUsageDropdown !== '0') {
      filteredMiscellaneous = filteredMiscellaneous
        .filter(m => (m.usage === this.selectedMiscellaneousUsageDropdown));
    }

    if (searchValue === 1) {
      return filteredMiscellaneous
        .filter(m => m.global).length;
    } else if (searchValue === 0) {
      return filteredMiscellaneous
        .filter(m => !m.global).length;
    }
    return filteredMiscellaneous.length;
  }

  createEvent(event): void {
    this.miscellaneous.unshift(event.miscellaneous);
    this.filterMiscellaneous();
  }

  editEvent(event): void {
    let index = -1;
    this.miscellaneous.some((miscellaneous, i) => {
      if (miscellaneous.id === event.miscellaneous.id) {
        index = i;
        return true;
      }
    });
    if (index > -1) {
      this.miscellaneous[index] = event.miscellaneous;
      this.filterMiscellaneous(false);
    }
  }

  deleteEvent(event): void {
    const index = this.miscellaneous.indexOf(event.miscellaneous);
    if (index > -1) {
      this.miscellaneous.splice(index, 1);
    }
  }
}
