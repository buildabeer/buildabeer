import { Component, OnInit } from '@angular/core';
import { IAcid } from '../acid';
import { AcidService } from '../acid.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-acid',
  templateUrl: './acid.component.html',
  styleUrls: ['./acid.component.scss']
})
export class AcidComponent implements OnInit {

  acid: IAcid;
  errorMessage: string = "Loading..."

  constructor(private _acidService: AcidService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    let acidId: number = this._activatedRoute.snapshot.params['id'];
    this._acidService.getAcid(acidId)
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if(retryCount < 6) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000)
      })
      .subscribe((acidData) => {
        if (acidData == null) {
          this.errorMessage = "Specified acid was not found.";
        } else {
          this.acid = acidData;
          this.errorMessage = "";
        }
      }, (error) => {
          if (error.status == "401") {
            this.errorMessage = "You must log in first.";
          } else {
            this.errorMessage = "Problem with the service. Please try against later.";
          }
          console.error(error);
      });
  }

  onBackButtonClick(): void {
    this._router.navigate(['/acids']);
  }
}
