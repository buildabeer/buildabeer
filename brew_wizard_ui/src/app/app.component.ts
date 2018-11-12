import { Angular2TokenService } from 'angular2-token'
import { Component, NgModule } from '@angular/core';
import { environment } from "../environments/environment"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _authToken: Angular2TokenService) {
    this._authToken.init(environment.token_auth_config);
  }
}
