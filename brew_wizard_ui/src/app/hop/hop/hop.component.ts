import { Component, OnInit } from '@angular/core';
import { IHop } from '../hop';
import { HopService } from '../hop.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-hop',
  templateUrl: './hop.component.html',
  styleUrls: ['./hop.component.scss']
})
export class HopComponent implements OnInit {

  hop: IHop;
  hop_type: string;
  errorMessage: string = "Loading..."

  constructor(private _hopService: HopService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    let hopId: number = this._activatedRoute.snapshot.params['id'];
    this._hopService.getHop(hopId)
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
      .subscribe((hopData) => {
        if (hopData == null) {
          this.errorMessage = "Specified hop was not found.";
        } else {
          this.hop = hopData;
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
    this._router.navigate(['/hops']);
  }
}
