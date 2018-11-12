import { AuthService } from "../../user/auth.service";
import { Component, OnInit } from '@angular/core';
import { IAcid } from '../acid';
import { AcidService } from '../acid.service';

@Component({
  selector: 'app-acid-list',
  templateUrl: './acid-list.component.html',
  styleUrls: ['./acid-list.component.scss']
})
export class AcidListComponent implements OnInit {

  search: string = "";
  title: string = "Acids";
  errorMessage: string = "Loading data...";
  page: number = 1;
  pageText: number = 1;
  acids: IAcid[] = [];
  displayedAcids: IAcid[] = [];

  constructor(private _acidService: AcidService,
    public _authService: AuthService) { }

  ngOnInit() {
    this._acidService.getAcids()
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if(retryCount < 3) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000)
      })
      .subscribe(acidData => {
          this.acids = acidData;
          this.displayedAcids = acidData;
          this.errorMessage = "No data found."
        },
        error => {
          if (error.status == "401") {
            this.errorMessage = "You must log in first.";
          } else {
            this.errorMessage = "Problem with the service. Please try against later.";
          }
          console.error(error);
      });
  }

  filterAcids(resetPage = true): void {
    if(resetPage) {
          this.page = 1;
          this.pageText = 1;
    }

    this.displayedAcids = this.acids;
  }

  searchedAcids(): IAcid[] {
    return this.displayedAcids
      .filter(w => w.name.match(new RegExp(this.search, "i")));
  }

  trackByAcidName(index: number, acid: any): string {
    return acid.name;
  }

  onPageChange(): void {
    if(this.page > this.getPageCount()) {
      this.page = this.getPageCount();
    } else if (this.page < 1) {
      this.page = 1;
    }
    this.pageText = this.page;
  }

  getPageCount(): number {
    return Math.ceil(this.searchedAcids().length / 20) > 0 ?
      Math.ceil(this.searchedAcids().length / 20) : 1;
  }

  getTotalAcidCount(): number {
    return this.acids
      .filter(w => w.name.match(new RegExp(this.search, "i"))).length;
  }

  onSearchChange(searchText: string): void {
    this.search = searchText;
  }

  createEvent(event): void {
    this.acids.unshift(event.acid);
  }

  editEvent(event): void {
    var index = -1;
    this.acids.forEach((acid, i) => {
      if(acid.id === event.acid.id) {
        index = i;
      }
    })
    if (index > -1) {
      this.acids[index] = event.acid;
      this.filterAcids(false);
    }
  }

  deleteEvent(event): void {
    var index = this.acids.indexOf(event.acid);
    if (index > -1) {
      this.acids.splice(index, 1);
    }
  }
}
