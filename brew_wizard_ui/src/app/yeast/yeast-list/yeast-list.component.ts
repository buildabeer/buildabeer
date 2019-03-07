import { AuthService } from '../../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { IYeast } from '../yeast';
import { YeastService } from '../yeast.service';

@Component({
  selector: 'app-yeast-list',
  templateUrl: './yeast-list.component.html',
  styleUrls: ['./yeast-list.component.scss']
})
export class YeastListComponent implements OnInit {

  yeasts: IYeast[] = [];
  displayedYeasts: IYeast[] = [];
  search = '';
  title = 'Yeasts';
  selectedYeastCountDropdown = 'All';
  selectedYeastTypeDropdown = '0';
  selectedYeastLabDropdown = '0';
  errorMessage = 'Loading data...';
  page = 1;
  pageText = 1;

  yeastTypes: string[] = ['Ale', 'Lager', 'Wheat', 'Wine', 'Champagne', 'Cider'];
  yeastLabs: string[] = [];

  constructor(private _yeastService: YeastService,
    public _authService: AuthService) { }

  ngOnInit() {

    this._yeastService.getYeasts()
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
          this.yeasts = yeastData;
          this.displayedYeasts = yeastData;
          this.errorMessage = 'No data found.';

          this.yeasts.forEach((yeast) => {
            if (!this.yeastLabs.includes(yeast.lab)) {
              this.yeastLabs.push(yeast.lab);
            }
          });
        },
        error => {
          if (error.status === 401) {
            this.errorMessage = 'You must log in first.';
          } else {
            this.errorMessage = 'Problem with the service. Please try again later.';
          }
          console.error(error);
      });
  }

  filterYeasts(resetPage = true): void {
    if (resetPage) {
      this.page = 1;
      this.pageText = 1;
    }

    this.displayedYeasts = this.yeasts;

    if (this.selectedYeastCountDropdown !== 'All') {
      this.displayedYeasts =  this.displayedYeasts.filter(m => (m.global &&
        this.selectedYeastCountDropdown === 'Global') || (!m.global &&
        this.selectedYeastCountDropdown === 'Local'));
    }

    if (this.selectedYeastTypeDropdown !== '0') {
      this.displayedYeasts = this.displayedYeasts
        .filter(m => (m.yeast_type === this.selectedYeastTypeDropdown));
    }

    if (this.selectedYeastLabDropdown !== '0') {
      this.displayedYeasts = this.displayedYeasts
        .filter(m => (m.lab === this.selectedYeastLabDropdown));
    }
  }

  searchedYeasts(): IYeast[] {
    return this.displayedYeasts
      .filter(m => m.name.match(new RegExp(this.search, 'i')) || m.product_id.match(new RegExp(this.search, 'i')));
  }

  trackByYeastName(index: number, yeast: any): string {
    return yeast.name;
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
    return Math.ceil(this.searchedYeasts().length / 20) > 0 ?
      Math.ceil(this.searchedYeasts().length / 20) : 1;
  }

  getTypeFilteredYeastCount(searchValue: string): number {
    let filteredYeasts: IYeast[];

    filteredYeasts = this.yeasts
      .filter(m => m.name.match(new RegExp(this.search, 'i')) || m.product_id.match(new RegExp(this.search, 'i')));

    if (this.selectedYeastCountDropdown !== 'All') {
      filteredYeasts = filteredYeasts.filter(m => (m.global &&
        this.selectedYeastCountDropdown === 'Global') || (!m.global &&
        this.selectedYeastCountDropdown === 'Local'));
    }

    if (this.selectedYeastLabDropdown !== '0') {
      filteredYeasts = filteredYeasts
        .filter(m => (m.lab === this.selectedYeastLabDropdown));
    }

    if (searchValue === '0') {
      return filteredYeasts.length;
    }
    return filteredYeasts
      .filter(m => m.yeast_type === searchValue).length;
  }

  getLabFilteredYeastCount(searchValue: string): number {
    let filteredYeasts: IYeast[];

    filteredYeasts = this.yeasts
      .filter(m => m.name.match(new RegExp(this.search, 'i')) || m.product_id.match(new RegExp(this.search, 'i')));

    if (this.selectedYeastCountDropdown !== 'All') {
      filteredYeasts = filteredYeasts.filter(m => (m.global &&
        this.selectedYeastCountDropdown === 'Global') || (!m.global &&
        this.selectedYeastCountDropdown === 'Local'));
    }

    if (this.selectedYeastTypeDropdown !== '0') {
      filteredYeasts = filteredYeasts
        .filter(m => (m.yeast_type === this.selectedYeastTypeDropdown));
    }

    if (searchValue === '0') {
      return filteredYeasts.length;
    }
    return filteredYeasts
      .filter(m => m.lab === searchValue).length;
  }

  getGlobalFilteredYeastCount(searchValue: number): number {
    let filteredYeasts: IYeast[];

    filteredYeasts = this.yeasts
      .filter(m => m.name.match(new RegExp(this.search, 'i')) || m.product_id.match(new RegExp(this.search, 'i')));

    if (this.selectedYeastTypeDropdown !== '0') {
      filteredYeasts = filteredYeasts
        .filter(m => (m.yeast_type === this.selectedYeastTypeDropdown));
    }

    if (this.selectedYeastLabDropdown !== '0') {
      filteredYeasts = filteredYeasts
        .filter(m => (m.lab === this.selectedYeastLabDropdown));
    }

    if (searchValue === 1) {
      return filteredYeasts
        .filter(m => m.global).length;
    } else if (searchValue === 0) {
      return filteredYeasts
        .filter(m => !m.global).length;
    }
    return filteredYeasts.length;
  }

  createEvent(event): void {
    this.yeasts.unshift(event.yeast);
  }

  editEvent(event): void {
    let index = -1;
    this.yeasts.forEach((yeast, i) => {
      if (yeast.id === event.yeast.id) {
        index = i;
      }
    });
    if (index > -1) {
      this.yeasts[index] = event.yeast;
      this.filterYeasts(false);
    }
  }

  deleteEvent(event): void {
    const index = this.yeasts.indexOf(event.yeast);
    if (index > -1) {
      this.yeasts.splice(index, 1);
    }
  }
}
