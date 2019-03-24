import { Component, OnInit, Input } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';

@Component({
  selector: 'app-mash-runner',
  templateUrl: './mash-runner.component.html',
  styleUrls: ['./mash-runner.component.scss']
})
export class MashRunnerComponent implements OnInit {

  touched = false;
  @Input() set hlt_water(value: number) {
    if (!this.touched) {
      this.hltQnty = this._designer.checkGallonsToLiters(this._designer.estimateGallonsNeeded()) - value;
    }
  }

  hltQnty = this._designer.checkGallonsToLiters(this._designer.estimateGallonsNeeded()) -
            this._designer.getMashWaterInfo().step_info[0].water_amount;

  hlt_addition = false;
  ph_recalculator: { ph: number, addition_type: string, gallons: number } = {
    addition_type: 'phosphoric',
    ph: this._designer.getEstimatedPh(),
    gallons: this._designer.roundHundredth(this._designer.checkGallonsToLiters(
      this._designer.inputConversion(this._designer.recipe.mash_ratio, 'ratio') *
      this._designer.getTotalGrainWeight()))
  };
  ph_collapse: boolean[];
  ph_adjustment = 0;
  steps_used: { step_name: string, step_temp: number, step_time: number, water_amount: number, water_temp: number }[] = [];

  constructor(public _designer: DesignerService) { }

  ngOnInit() {
    this.ph_collapse = new Array(this._designer.getMashWaterInfo().step_info.length).fill(false);
    this.steps_used = JSON.parse(JSON.stringify(this._designer.getMashWaterInfo().step_info));
    this.hltQnty = this.hlt_water;
  }

  calculatePhAdjust() {
    this.ph_adjustment = this._designer.getPhDrop(this.ph_recalculator.addition_type,
      this.ph_recalculator.ph, this.ph_recalculator.gallons);
  }

  agentAdjust(quantity) {
    return (this._designer.inputConversion(this._designer.estimateGallonsNeeded(), 'liquid') -
            this._designer.inputConversion(this.hltQnty, 'liquid')) /
            this._designer.inputConversion(this._designer.estimateGallonsNeeded(), 'liquid') *
            quantity;
  }
}
