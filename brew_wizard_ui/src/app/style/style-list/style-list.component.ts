import { AuthService } from '../../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { IStyle } from '../style';
import { StyleService } from '../style.service';

@Component({
  selector: 'app-style-list',
  templateUrl: './style-list.component.html',
  styleUrls: ['./style-list.component.scss']
})
export class StyleListComponent implements OnInit {

  styles: IStyle[] = [];
  displayedStyles: IStyle[] = [];
  search = '';
  title = 'Styles';
  selectedStyleCountDropdown = 'All';
  selectedStyleTypeDropdown = '0';
  selectedStyleCategoryDropdown = '0';
  errorMessage = 'Loading data...';
  page = 1;
  pageText = 1;
  styleTypes: string[] = ['Aroma', 'Bittering', 'Both'];
  styleCategories: {category_name: string, category_number: number }[] = [];

  constructor(private _styleService: StyleService,
    public _authService: AuthService) { }

  ngOnInit() {

    this._styleService.getStyles()
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
      .subscribe(styleData => {
          this.styles = styleData;
          this.displayedStyles = styleData;
          const found = [];

          styleData.forEach((style) => {
            if (!found.includes(style.category_number)) {
              this.styleCategories.push({ category_number: style.category_number,
                category_name: style.category_name });
              found.push(style.category_number);
            }
          });
          this.styleCategories = this.styleCategories.sort(function(a, b) {
            if (a.category_number < b.category_number) {
              return -1;
            } else if (a.category_number > b.category_number) {
              return 1;
            } else {
              return 0;
            }
          });
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

  filterStyles(resetPage = true): void {
    if (resetPage) {
      this.page = 1;
      this.pageText = 1;
    }

    this.displayedStyles = this.styles;
    if (this.selectedStyleCountDropdown !== 'All') {
      this.displayedStyles =  this.displayedStyles.filter(m => (m.global &&
        this.selectedStyleCountDropdown === 'Global') || (!m.global &&
        this.selectedStyleCountDropdown === 'Local'));
    }

    if (this.selectedStyleCategoryDropdown !== '0') {
      this.displayedStyles = this.displayedStyles
        .filter(m => (m.category_number === parseInt(this.selectedStyleCategoryDropdown, 10)));
    }
  }

  searchedStyles(): IStyle[] {
    return this.displayedStyles
      .filter(m => m.name.match(new RegExp(this.search, 'i')) || m.category_name.match(new RegExp(this.search, 'i')));
  }

  trackByStyleName(index: number, style: any): string {
    return style.name;
  }

  validStyleCategories(): { category_name: string, category_number: number }[] {
    return this.styleCategories
      .filter(cat => this.getCategoryFilteredStyleCount(cat.category_number) > 0
      || cat.category_number.toString() === this.selectedStyleCategoryDropdown);
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
    return Math.ceil(this.displayedStyles.length / 20) > 0 ?
      Math.ceil(this.displayedStyles.length / 20) : 1;
  }

  getCategoryFilteredStyleCount(searchValue: number): number {
    let filteredStyles: IStyle[];

    filteredStyles = this.styles
      .filter(m => m.name.match(new RegExp(this.search, 'i')) || m.category_name.match(new RegExp(this.search, 'i')));


    if (this.selectedStyleCountDropdown !== 'All') {
      filteredStyles =  filteredStyles.filter(m => (m.global &&
        this.selectedStyleCountDropdown === 'Global') || (!m.global &&
        this.selectedStyleCountDropdown === 'Local'));
    }

    if (searchValue === 0) {
      return filteredStyles.length;
    }
    return filteredStyles
      .filter(m => searchValue === m.category_number).length;
  }

  getGlobalFilteredStyleCount(searchValue: number): number {
    let filteredStyles: IStyle[];

    filteredStyles = this.styles
      .filter(m => m.name.match(new RegExp(this.search, 'i')) || m.category_name.match(new RegExp(this.search, 'i')));

    if (this.selectedStyleCategoryDropdown !== '0') {
      this.displayedStyles = this.displayedStyles
        .filter(m => (m.category_number === parseInt(this.selectedStyleCategoryDropdown, 10)));
    }

    if (searchValue === 1) {
      return filteredStyles
        .filter(m => m.global).length;
    } else if (searchValue === 0) {
      return filteredStyles
        .filter(m => !m.global).length;
    }
    return filteredStyles.length;
  }

  createEvent(event): void {
    this.styles.unshift(event.style);
  }

  editEvent(event): void {
    let index = -1;
    this.styles.forEach((style, i) => {
      if (style.id === event.style.id) {
        index = i;
      }
    });
    if (index > -1) {
      this.styles[index] = event.style;
      this.filterStyles(false);
    }
  }

  deleteEvent(event): void {
    const index = this.styles.indexOf(event.style);
    if (index > -1) {
      this.styles.splice(index, 1);
    }
  }
}
