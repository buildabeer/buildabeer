import { UserService } from '../user.service';
import { Angular2TokenService } from 'angular2-token'
import { AuthService } from '../auth.service'
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.service';
import { IMeasurementSetting } from '../measurement-setting';
import { IUserData } from "../user-data";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  recipeCount: number = 0;

  measurement_load_message = "Loading..."
  measurement_settings_loading = true;
  measurement_settings: IMeasurementSetting = {
    'liquid': 'us',
    'temperature': 'us',
    'hops': 'us',
    'malts': 'us',
    'agents': 'metric',
    'pressure': 'us',
    'ibu': 'tinseth',
    'color': 'srm'
  }

  user = {
    recipe_reminders: (<IUserData>this._authTokenService.currentUserData).recipe_reminders,
    contact: (<IUserData>this._authTokenService.currentUserData).contact
  }

  constructor(private _userService: UserService, public _authTokenService: Angular2TokenService,
    private _recipeService: RecipeService, private _authService: AuthService) { }

  ngOnInit() {
    this._recipeService.getRecipeCount()
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
            .subscribe(countData => {
                this.recipeCount = countData;
              },
              error => {
                console.error(error);
            });

    this._userService.getSettings()
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
            .subscribe(settingData => {
                if(settingData !== null) {
                  this.measurement_settings = settingData;
                  this.measurement_settings_loading = false;
                } else {
                  this.measurement_load_message = "Load failed."
                }
              },
              error => {
                console.error(error);
                this.measurement_load_message = error;
            });

  }

  updateUserSettings(): void {
    this._authService.updateUserInfo(this.user)
      .subscribe((res) => {
        window.alert("Settings saved.");
      }, (error) => {
        window.alert("There was an error processing your request, please try again later.");
        console.error(error);
      });
  }

  updateMeasurementSettings(): void {
    this._userService.editSettings(this.measurement_settings)
      .subscribe((res) => {
        window.alert("Settings saved.");
      }, (error) => {
        window.alert("There was an error processing your request, please try again later.");
        console.error(error);
      });
  }
}
