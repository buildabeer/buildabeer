import { AuthService } from '../../user/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWaterProfile } from '../water-profile';
import { WaterProfileService } from '../water-profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-water-card',
  templateUrl: './water-card.component.html',
  styleUrls: ['./water-card.component.scss']
})
export class WaterCardComponent implements OnInit {

  isCollapsed = true;

  @Input()
  profile: IWaterProfile;

  @Output()
  uponWaterDelete = new EventEmitter();

  @Output()
  uponProfileEdit = new EventEmitter();

  constructor(private _waterProfileService: WaterProfileService,
    public _router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.isCollapsed = (this._router.url === '/water_profiles');
  }

  deleteCard(): void {
    const recipe_message: string = this.profile.recipe_count > 0
    ? 'This profile is used ' + this.profile.recipe_count + ' times, are you sure you want to delete it?'
    : 'Are you sure you want to delete this profile?';
    if (window.confirm(recipe_message)) {
      this._waterProfileService.deleteWaterProfile(this.profile.id)
        .subscribe((res) => {
          if (this._router.url !== '/water_profiles') {
            this._router.navigate(['/water_profiles']);
          } else {
            this.uponWaterDelete.emit({waterProfile: this.profile});
          }
        }, (error) => {
          if (error.status === 401) {
            window.alert('You must log in first.');
          } else {
            window.alert('There was an error deleting the water profile, please try again later.');
          }
          console.error(error);
        });
    }
  }

  editEvent(event): void {
    this.profile = event.waterProfile;
    this.uponProfileEdit.emit({profile: this.profile});
  }
}
