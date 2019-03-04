import { AuthService } from '../../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { IWaterProfile } from '../water-profile';
import { WaterProfileService } from '../water-profile.service';

@Component({
  selector: 'app-water-profile-list',
  templateUrl: './water-profile-list.component.html',
  styleUrls: ['./water-profile-list.component.scss']
})
export class WaterProfileListComponent implements OnInit {

  search = '';
  title = 'Water Profiles';
  selectedWaterCountDropdown = 'All';
  errorMessage = 'Loading data...';
  page = 1;
  pageText = 1;
  waters: IWaterProfile[] = [];
  displayedWaters: IWaterProfile[] = [];

  constructor(private _waterProfileService: WaterProfileService,
    public _authService: AuthService) { }

  ngOnInit() {
    this._waterProfileService.getWaterProfiles()
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
      .subscribe(profileData => {
          this.waters = profileData;
          this.displayedWaters = profileData;
          this.errorMessage = 'No data found.';
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

  filterProfiles(resetPage = true): void {
    if (resetPage) {
          this.page = 1;
          this.pageText = 1;
    }

    this.displayedWaters = this.waters;

    if (this.selectedWaterCountDropdown !== 'All') {
      this.displayedWaters = this.displayedWaters.filter(w => (w.global &&
        this.selectedWaterCountDropdown === 'Global') || (!w.global &&
        this.selectedWaterCountDropdown === 'Local'));
    }
  }

  searchedProfiles(): IWaterProfile[] {
    return this.displayedWaters
      .filter(w => w.name.match(new RegExp(this.search, 'i')));
  }

  trackByWaterName(index: number, profile: any): string {
    return profile.name;
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
    return Math.ceil(this.searchedProfiles().length / 20) > 0 ?
      Math.ceil(this.searchedProfiles().length / 20) : 1;
  }

  getTotalWaterCount(): number {
    return this.waters
      .filter(w => w.name.match(new RegExp(this.search, 'i'))).length;
  }

  getGlobalWaterCount(): number {
    return this.waters.filter(w => w.global === true)
      .filter(w => w.name.match(new RegExp(this.search, 'i'))).length;
  }

  getLocalWaterCount(): number {
    return this.waters.filter(w => w.global === false)
      .filter(w => w.name.match(new RegExp(this.search, 'i'))).length;
  }

  onWaterCountDropdownChange(selectedDropdownValue: string): void {
    this.selectedWaterCountDropdown = selectedDropdownValue;
  }

  onSearchChange(searchText: string): void {
    this.search = searchText;
  }

  createEvent(event): void {
    this.waters.unshift(event.waterProfile);
  }

  editEvent(event): void {
    let index = -1;
    this.waters.forEach((profile, i) => {
      if (profile.id === event.profile.id) {
        index = i;
      }
    });
    if (index > -1) {
      this.waters[index] = event.profile;
      this.filterProfiles(false);
    }
  }

  deleteEvent(event): void {
    const index = this.waters.indexOf(event.waterProfile);
    if (index > -1) {
      this.waters.splice(index, 1);
    }
  }
}
