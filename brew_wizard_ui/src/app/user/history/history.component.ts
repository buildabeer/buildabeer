import { AuthService } from '../../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { IHistory } from '../history';
import { UserService } from '../user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  history: IHistory[] = [];
  displayedHistory: IHistory[] = [];
  search = '';
  title = 'History';
  start_search: Date = null;
  end_search: Date = null;
  errorMessage = 'Loading data...';
  page = 1;
  pageText = 1;
  isCollapsed: boolean[] = [];
  isEdit: boolean[] = [];

  constructor(private _userService: UserService,
    public _authService: AuthService) { }

  ngOnInit() {

    this._userService.getHistory()
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
      .subscribe(historyData => {
          this.isCollapsed.fill(true, 0, historyData.length - 1);
          this.isEdit.fill(false, 0, historyData.length - 1);
          this.history = historyData;
          this.errorMessage = 'No data found.';
        },
        error => {
          this.errorMessage = 'Problem with the service. Please try against later.';
          console.error(error);
      });
  }

  filteredHistory(): IHistory[] {
    return this.history.filter(h => h.recipe_name.match(new RegExp(this.search, 'i')) &&
      (this.end_search ? h.brew_date <= this.end_search : true) && (this.start_search ? h.brew_date >= this.start_search : true));
  }

  trackByHistoryName(index: number, history: any): string {
    return history.name;
  }

  addHistory(): void {
    this.history.unshift({
      og: null,
      fg: null,
      gallons: null,
      ingredients: '',
      notes: '',
      recipe_name: '',
      recipe_id: null,
      brew_date: new Date(),
      id: null
    });
    this.isCollapsed.unshift(true);
    this.isEdit.unshift(true);
  }

  deleteHistory(index: number): void {
    if (this.history[index].id !== null) {
      this._userService.deleteHistory(this.history[index].id)
        .subscribe(historyData => {
            this.history.splice(index, 1);
            this.isCollapsed.splice(index, 1);
            this.isEdit.splice(index, 1);
            window.alert('History point deleted.');
          },
          error => {
            if (error.status === 401) {
              window.alert('You must log in first.');
            } else {
              window.alert('There was an error deleting the history point, please try again later.');
            }
            console.error(error);
        });
    }
  }

  saveHistory(index: number): void {
    if (this.history[index].id === null) {
      this._userService.createHistory(this.history[index])
        .subscribe((res) => {
          this.history[index].id = JSON.parse(res._body).id;
          this.isEdit[index] = false;
          window.alert('History point saved.');
        }, (error) => {
          if (error.status === 401) {
            window.alert('You must log in first.');
          } else {
            window.alert('There was an error adding the history point, please try again later.');
          }
          console.error(error);
        });
    } else {
      this._userService.editHistory(this.history[index])
        .subscribe((res) => {
          this.history[index].id = JSON.parse(res._body).id;
          this.isEdit[index] = false;
          window.alert('History point saved.');
        }, (error) => {
          if (error.status === 401) {
            window.alert('You must log in first.');
          } else {
            window.alert('There was an error adding the history point, please try again later.');
          }
          console.error(error);
        });
    }
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
    return Math.ceil(this.filteredHistory().length / 20) > 0 ?
      Math.ceil(this.filteredHistory().length / 20) : 1;
  }
}
