import { Component, OnInit } from '@angular/core';
import { IMalt } from '../malt';
import { MaltService } from '../malt.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-malt',
  templateUrl: './malt.component.html',
  styleUrls: ['./malt.component.scss']
})
export class MaltComponent implements OnInit {

  malt: IMalt;
  malt_type: string;
  errorMessage: string = "Loading..."

  constructor(private _maltService: MaltService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    let maltId: number = this._activatedRoute.snapshot.params['id'];
    this._maltService.getMalt(maltId)
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
      .subscribe((maltData) => {
        if (maltData == null) {
          this.errorMessage = "Specified malt was not found.";
        } else {

          this._maltService.getTypeById(maltData.malt_type_id)
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
            .subscribe((maltType) => {
              if (maltType == null) {
                this.errorMessage = "Type was not found for specified malt.";
              } else {
                this.malt_type = maltType.name;
              }
            })

          this.malt = maltData;
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
    this._router.navigate(['/malts']);
  }
}
