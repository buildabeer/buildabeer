import { AuthService } from "../../user/auth.service";
import { Component, OnInit } from '@angular/core';
import { IEquipment } from '../equipment';
import { EquipmentService } from '../equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {

  equipment: IEquipment[] = [];
  displayedEquipment: IEquipment[] = [];
  search: string = "";
  title: string = "Equipment";
  selectedEquipmentCountDropdown: string = "All";
  selectedEquipmentTypeDropdown: string = "Any";
  errorMessage: string = "Loading data...";
  page: number = 1;
  pageText: number = 1;
  equipmentTypes: string[] = ["Brew in a Bag", "Extract", "All Grain"];

  constructor(private _equipmentService: EquipmentService,
    public _authService: AuthService) { }

  ngOnInit() {
    this._equipmentService.getEquipments()
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
      .subscribe(equipmentData => {
          this.equipment = equipmentData;
          this.displayedEquipment = equipmentData;
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

  filterEquipment(resetPage = true): void {
    if(resetPage) {
      this.page = 1;
      this.pageText = 1;
    }

    this.displayedEquipment = this.equipment

    if(this.selectedEquipmentCountDropdown !== "All") {
      this.displayedEquipment =  this.displayedEquipment.filter(m => (m.global &&
        this.selectedEquipmentCountDropdown === "Global") || (!m.global &&
        this.selectedEquipmentCountDropdown === "Local"))
    }
  }

  searchedEquipment(): IEquipment[] {
    return this.displayedEquipment
      .filter(m => m.name.match(new RegExp(this.search, "i")));
  }

  trackByEquipmentName(index: number, equipment: any): string {
    return equipment.name;
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
    return Math.ceil(this.searchedEquipment().length / 20) > 0 ?
      Math.ceil(this.searchedEquipment().length / 20) : 1;
  }

  getGlobalFilteredEquipmentCount(searchValue: number): number {
    var filteredEquipment: IEquipment[];

    filteredEquipment = this.equipment
      .filter(m => m.name.match(new RegExp(this.search, "i")));

    if(searchValue === 1) {
      return filteredEquipment
        .filter(m => m.global).length;
    } else if (searchValue === 0) {
      return filteredEquipment
        .filter(m => !m.global).length;
    }
    return filteredEquipment.length;
  }

  createEvent(event): void {
    this.equipment.unshift(event.equipment);
  }

  editEvent(event): void {
    var index = -1;
    this.equipment.forEach((equipment, i) => {
      if(equipment.id === event.equipment.id) {
        index = i;
      }
    })
    if (index > -1) {
      this.equipment[index] = event.equipment;
      this.filterEquipment(false);
    }
  }

  deleteEvent(event): void {
    var index = this.equipment.indexOf(event.equipment);
    if (index > -1) {
      this.equipment.splice(index, 1);
    }
  }
}
