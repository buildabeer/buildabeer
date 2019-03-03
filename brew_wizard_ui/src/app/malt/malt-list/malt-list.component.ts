import { AuthService } from '../../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { IMalt } from '../malt';
import { MaltService } from '../malt.service';

@Component({
  selector: 'app-malt-list',
  templateUrl: './malt-list.component.html',
  styleUrls: ['./malt-list.component.scss']
})
export class MaltListComponent implements OnInit {

  malts: IMalt[] = [];
  displayedMalts: IMalt[] = [];
  maltTypes: string[] = [];
  search = '';
  title = 'Fermentables';
  selectedMaltCountDropdown = 'All';
  selectedMaltTypeDropdown = 0;
  errorMessage = 'Loading data...';
  page = 1;
  pageText = 1;

  constructor(private _maltService: MaltService,
    public _authService: AuthService) { }

  ngOnInit() {
    this._maltService.getTypes()
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
      .subscribe(maltTypeData => {
          this.maltTypes = maltTypeData;
        },
        error => {
          if (error.status === 401) {
            this.errorMessage = 'You must log in first.';
          } else {
            this.errorMessage = 'Problem with the service. Please try against later.';
          }
          console.error(error);
      });

    this._maltService.getMalts()
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
      .subscribe(maltData => {
          this.malts = maltData;
          this.displayedMalts = maltData;
          this.errorMessage = 'No data found.';
        },
        error => {
          if (error.status === 401) {
            this.errorMessage = 'You must log in first.';
          } else {
            this.errorMessage = 'Problem with the service. Please try against later.';
          }
          console.error(error);
      });
  }

  filterMalts(resetPage = true): void {
    if (resetPage) {
      this.page = 1;
      this.pageText = 1;
    }

    this.displayedMalts = this.malts;

    if (this.selectedMaltCountDropdown !== 'All') {
      this.displayedMalts =  this.displayedMalts.filter(m => (m.global &&
        this.selectedMaltCountDropdown === 'Global') || (!m.global &&
        this.selectedMaltCountDropdown === 'Local'));
    }

    if (this.selectedMaltTypeDropdown != 0) {
      this.displayedMalts = this.displayedMalts
        .filter(m => (m.malt_type_id === this.selectedMaltTypeDropdown));
    }
  }

  searchedMalts(): IMalt[] {
    return this.displayedMalts
      .filter(m => m.name.match(new RegExp(this.search, 'i')));
  }

  trackByMaltName(index: number, malt: any): string {
    return malt.name;
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
    return Math.ceil(this.searchedMalts().length / 20) > 0 ?
      Math.ceil(this.searchedMalts().length / 20) : 1;
  }

  getTypeFilteredMaltCount(searchValue: number): number {
    let filteredMalts: IMalt[];

    filteredMalts = this.malts
      .filter(m => m.name.match(new RegExp(this.search, 'i')));

    if (this.selectedMaltCountDropdown !== 'All') {
      filteredMalts = filteredMalts.filter(m => (m.global &&
        this.selectedMaltCountDropdown === 'Global') || (!m.global &&
        this.selectedMaltCountDropdown === 'Local'));
    }

    if (searchValue === 0) {
      return filteredMalts.length;
    }
    return filteredMalts
      .filter(m => m.malt_type_id === searchValue).length;
  }

  getGlobalFilteredMaltCount(searchValue: number): number {
    let filteredMalts: IMalt[];

    filteredMalts = this.malts
      .filter(m => m.name.match(new RegExp(this.search, 'i')));

    if (this.selectedMaltTypeDropdown != 0) {
      filteredMalts = filteredMalts
        .filter(m => (m.malt_type_id === this.selectedMaltTypeDropdown));
    }

    if (searchValue === 1) {
      return filteredMalts
        .filter(m => m.global).length;
    } else if (searchValue === 0) {
      return filteredMalts
        .filter(m => !m.global).length;
    }
    return filteredMalts.length;
  }

  createEvent(event): void {
    this.malts.unshift(event.malt);
  }

  editEvent(event): void {
    let index = -1;
    this.malts.forEach((malt, i) => {
      if (malt.id === event.malt.id) {
        index = i;
      }
    });
    if (index > -1) {
      this.malts[index] = event.malt;
      this.filterMalts(false);
    }
  }

  deleteEvent(event): void {
    const index = this.malts.indexOf(event.malt);
    if (index > -1) {
      this.malts.splice(index, 1);
    }
  }
}
