import { Component, OnInit } from '@angular/core';
import { IStyle } from '../style';
import { StyleService } from '../style.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {

  style: IStyle;
  errorMessage = 'Loading...';

  constructor(private _styleService: StyleService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const styleId: number = this._activatedRoute.snapshot.params['id'];
    this._styleService.getStyleById(styleId)
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
      .subscribe((styleData) => {
        if (styleData === null) {
          this.errorMessage = 'Specified style was not found.';
        } else {
          this.style = styleData;
          this.errorMessage = '';
        }
      }, (error) => {
          if (error.status === 401) {
            this.errorMessage = 'You must log in first.';
          } else {
            this.errorMessage = 'Problem with the service. Please try against later.';
          }
          console.error(error);
      });
  }

  onBackButtonClick(): void {
    this._router.navigate(['/styles']);
  }
}
