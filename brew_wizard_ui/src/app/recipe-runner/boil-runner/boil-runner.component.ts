import { Component, OnInit } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';

@Component({
  selector: 'app-boil-runner',
  templateUrl: './boil-runner.component.html',
  styleUrls: ['./boil-runner.component.scss']
})
export class BoilRunnerComponent implements OnInit {

  boil_gallons: number = this._designer.roundHundredth(this._designer.checkGallonsToLiters(this._designer.estimatePreGallons()));
  recalculator: { og: number, addition_type: string, gallons: number } = {
    og: this._designer.roundThousandth(this._designer.getEstimatedPreboilPoints() / this._designer.estimatePreGallons() / 1000 + 1),
    addition_type: 'dme',
    gallons: this.boil_gallons };
  timer = this._designer.recipe.boil_time;
  alarms: {};

  constructor(public _designer: DesignerService) { }

  ngOnInit() {
  }

  calculateBoilAddition(): number {
    const gravities: {} = {
      'sugar': 46,
      'dme': 44,
      'lme': 36,
    };

    return this._designer.roundPointOne(
      this._designer.roundHundredth((this._designer.getEstimatedPreboilPoints() -
        (this.recalculator.og - 1) * 1000 * this._designer.inputConversion(this.recalculator.gallons, 'liquid')) /
        gravities[this.recalculator.addition_type]));
  }

  recalculateBoilTime(): void {
    const gallons = this._designer.inputConversion(this.boil_gallons, 'liquid') - this._designer.used_equipment.wl_boil;
    const new_time_hours = (gallons - this._designer.recipe.batch_size) / this._designer.used_equipment.boil_rate;
    this.timer = Math.floor(new_time_hours * 60);
  }

  setupBoilAlarms() {
    this.alarms = {};
    const hops = this._designer.getHopByUsage('boil');
    hops.forEach((hop) => {
      const time = Math.floor(hop.time * 60);
      if (this.alarms[time] !== undefined) {
        this.alarms[time].push('\n' + hop.quantity + ' ' + (this._designer.measurement.hops === 'us' ? 'oz' : 'g') +
                               ' of ' + hop.name + ' (' + hop.form + ')');
      } else {
        this.alarms[time] = [('\n' + hop.quantity + ' ' + (this._designer.measurement.hops === 'us' ? 'oz' : 'g') +
                               ' of ' + hop.name + ' (' + hop.form + ')')];
      }
    });

    const miscs = this._designer.getUsedMiscellaneous('Boil');
    miscs.forEach((misc) => {
      let time = Math.floor(misc.time * 60);
      if (misc.time_label === 'Hours') {
        time = time * 60;
      } else if (misc.time_label === 'Days') {
        time = time * 60 * 24;
      }
      if (this.alarms[time] !== undefined) {
        this.alarms[time].push('\n' + misc.quantity + ' ' + misc.quantity_label + ' of ' + misc.name +
                               ' should now be added.');
      } else {
        this.alarms[time] = [('\n' + misc.quantity + ' ' + misc.quantity_label + ' of ' + misc.name +
                               ' should now be added.')];
      }
    });
  }
}
