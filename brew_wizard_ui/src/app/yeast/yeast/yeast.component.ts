import { Component, OnInit } from '@angular/core';
import { IYeast } from '../yeast';
import { YeastService } from '../yeast.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-yeast',
  templateUrl: './yeast.component.html',
  styleUrls: ['./yeast.component.scss']
})
export class YeastComponent implements OnInit {

  yeast: IYeast;
  yeast_type: string;
  errorMessage = 'Loading...';

  constructor(private _yeastService: YeastService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const yeastId: number = this._activatedRoute.snapshot.params['id'];
    this._yeastService.getYeast(yeastId)
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if (retryCount < 6) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000);
      })
      .subscribe((yeastData) => {
        if (yeastData === null) {
          this.errorMessage = 'Specified yeast was not found.';
        } else {
          this.yeast = yeastData;
          this.errorMessage = '';
        }
      }, (error) => {
          if (error.status === 401) {
            this.errorMessage = 'You must log in first.';
          } else {
            this.errorMessage = 'Problem with the service. Please try again later.';
          }
          console.error(error);
      });
  }

  onBackButtonClick(): void {
    this._router.navigate(['/yeasts']);
  }
}
