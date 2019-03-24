import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';

@Component({
  selector: 'app-hlt-runner',
  templateUrl: './hlt-runner.component.html',
  styleUrls: ['./hlt-runner.component.scss']
})
export class HltRunnerComponent implements OnInit {

  hltTemp = this.getInitialTemperature();
  hltQnty = this._designer.getMashWaterInfo().step_info[0].water_amount;

  @Output()
  hlt_water = new EventEmitter();

  constructor(public _designer: DesignerService) { }

  ngOnInit() { }

  getInitialTemperature() {
    if (this._designer.recipe.recipe_type === 'Extract') {
      return 140;
    }
    return this._designer.checkFahrenheitToCelsius(this._designer.getMashWaterInfo().step_info[0].water_temp);
  }

  agentAdjust(quantity) {
    return (quantity * this._designer.inputConversion(this.hltQnty, 'liquid') / this._designer.addWaterGallons())
  }
}
