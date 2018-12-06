import { AuthService } from '../../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { IHop } from '../hop';
import { HopService } from '../hop.service';

@Component({
  selector: 'app-hop-list',
  templateUrl: './hop-list.component.html',
  styleUrls: ['./hop-list.component.scss']
})
export class HopListComponent implements OnInit {

  hops: IHop[] = [];
  displayedHops: IHop[] = [];
  search = '';
  title = 'Hops';
  selectedHopCountDropdown = 'All';
  selectedHopTypeDropdown = '0';
  selectedHopOriginDropdown = '0';
  errorMessage = 'Loading data...';
  page = 1;
  pageText = 1;
  hopTypes: string[] = ['Aroma', 'Bittering', 'Both'];
  hopOrigins: string[] = [];
  fullAromaList: string[] = [];
  aromaCheckbox: boolean[] = [];
  aromaSearch = '';

  constructor(private _hopService: HopService,
    public _authService: AuthService) { }

  ngOnInit() {

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
          this.displayedHops = hopData;
          this.hopOrigins = [...Array.from(new Set(hopData.map(item => item.origin)))];
          this.errorMessage = 'No data found.';
          this.fullAromaList = this.getFullAromaList();
          this.aromaCheckbox.fill(false, 0, this.fullAromaList.length - 1);
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

  aromaMatch(aroma: string) {
    return aroma.match(new RegExp(this.aromaSearch, 'i'));
  }

  aromaIndex(aroma: string): number {
    return this.fullAromaList.indexOf(aroma);
  }

  getFullAromaList(): string[] {
    const aroma_list: string[] = [];
    this.hops.forEach((hop) => {
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
    this.displayedHops.forEach((hop) => {
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

  filterHops(resetPage = true): void {
    if (resetPage) {
      this.page = 1;
      this.pageText = 1;
    }

    this.displayedHops = this.hops;

    if (this.selectedHopCountDropdown !== 'All') {
      this.displayedHops =  this.displayedHops.filter(m => (m.global &&
        this.selectedHopCountDropdown === 'Global') || (!m.global &&
        this.selectedHopCountDropdown === 'Local'));
    }

    if (this.selectedHopTypeDropdown !== '0') {
      this.displayedHops = this.displayedHops
        .filter(m => (m.hop_type === this.selectedHopTypeDropdown || m.hop_type === 'Both'));
    }

    if (this.selectedHopOriginDropdown !== '0') {
      this.displayedHops = this.displayedHops
        .filter(m => (m.origin === this.selectedHopOriginDropdown));
    }

    this.aromaCheckbox.forEach((checkbox, i) => {
      if (checkbox) {
        this.displayedHops = this.displayedHops.filter(h => h.aromas && h.aromas.split(', ').includes(this.fullAromaList[i]));
      }
    });
  }

  searchedHops(): IHop[] {
    return this.displayedHops
      .filter(m => m.name.match(new RegExp(this.search, 'i')));
  }

  trackByHopName(index: number, hop: any): string {
    return hop.name;
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
    return Math.ceil(this.searchedHops().length / 20) > 0 ?
      Math.ceil(this.searchedHops().length / 20) : 1;
  }

  getTypeFilteredHopCount(searchValue: string): number {
    let filteredHops: IHop[];

    filteredHops = this.hops
      .filter(m => m.name.match(new RegExp(this.search, 'i')));


    if (this.selectedHopCountDropdown !== 'All') {
      filteredHops =  filteredHops.filter(m => (m.global &&
        this.selectedHopCountDropdown === 'Global') || (!m.global &&
        this.selectedHopCountDropdown === 'Local'));
    }

    if (this.selectedHopOriginDropdown !== '0') {
      filteredHops = filteredHops
        .filter(m => (m.origin === this.selectedHopOriginDropdown));
    }

    this.aromaCheckbox.forEach((checkbox, i) => {
      if (checkbox) {
        filteredHops = filteredHops.filter(h => h.aromas && h.aromas.split(', ').includes(this.fullAromaList[i]));
      }
    });

    if (searchValue === '0') {
      return filteredHops.length;
    }
    return filteredHops
      .filter(m => m.hop_type === searchValue || m.hop_type === 'Both').length;
  }

  getOriginFilteredHopCount(searchValue: string): number {
    let filteredHops: IHop[];

    filteredHops = this.hops
      .filter(m => m.name.match(new RegExp(this.search, 'i')));


    if (this.selectedHopCountDropdown !== 'All') {
      filteredHops =  filteredHops.filter(m => (m.global &&
        this.selectedHopCountDropdown === 'Global') || (!m.global &&
        this.selectedHopCountDropdown === 'Local'));
    }

    if (this.selectedHopTypeDropdown !== '0') {
      this.displayedHops = this.displayedHops
        .filter(m => (m.hop_type === this.selectedHopTypeDropdown || m.hop_type === 'Both'));
    }

    this.aromaCheckbox.forEach((checkbox, i) => {
      if (checkbox) {
        filteredHops = filteredHops.filter(h => h.aromas && h.aromas.split(', ').includes(this.fullAromaList[i]));
      }
    });

    if (searchValue === '0') {
      return filteredHops.length;
    }
    return filteredHops
      .filter(m => m.origin === searchValue).length;
  }

  getGlobalFilteredHopCount(searchValue: number): number {
    let filteredHops: IHop[];

    filteredHops = this.hops
      .filter(m => m.name.match(new RegExp(this.search, 'i')));

    if (this.selectedHopTypeDropdown !== '0') {
      filteredHops = filteredHops
        .filter(m => (m.hop_type === this.selectedHopTypeDropdown || m.hop_type === 'Both'));
    }

    if (this.selectedHopOriginDropdown !== '0') {
      filteredHops = filteredHops
        .filter(m => (m.origin === this.selectedHopOriginDropdown));
    }

    this.aromaCheckbox.forEach((checkbox, i) => {
      if (checkbox) {
        filteredHops = filteredHops.filter(h => h.aromas && h.aromas.split(', ').includes(this.fullAromaList[i]));
      }
    });

    if (searchValue === 1) {
      return filteredHops
        .filter(m => m.global).length;
    } else if (searchValue === 0) {
      return filteredHops
        .filter(m => !m.global).length;
    }
    return filteredHops.length;
  }

  createEvent(event): void {
    this.hops.unshift(event.hop);
    this.filterHops();
  }

  editEvent(event): void {
    let index = -1;
    this.hops.forEach((hop, i) => {
      if (hop.id === event.hop.id) {
        index = i;
      }
    });
    if (index > -1) {
      this.hops[index] = event.hop;
      this.filterHops(false);
    }
  }

  deleteEvent(event): void {
    const index = this.hops.indexOf(event.hop);
    if (index > -1) {
      this.hops.splice(index, 1);
    }
  }
}
