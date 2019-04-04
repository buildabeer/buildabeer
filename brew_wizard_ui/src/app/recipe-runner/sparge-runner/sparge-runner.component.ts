import { Component, OnInit } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';

@Component({
  selector: 'app-sparge-runner',
  templateUrl: './sparge-runner.component.html',
  styleUrls: ['./sparge-runner.component.scss']
})
export class SpargeRunnerComponent implements OnInit {

  s_temp: number;
  s_quant: number;
  s_time: number;
  malts = this._designer.getMaltDisplay('Sparge');
  hops = this._designer.getHopByUsage('fwh');

  constructor(public _designer: DesignerService) { }

  ngOnInit() {
    this.s_time = 60;
    this.s_quant = this._designer.roundPointOne(this._designer.getMashWaterInfo().sparge_amount);
    this.s_temp = this._designer.roundPointOne(this._designer.checkFahrenheitToCelsius(170));
  }
}
