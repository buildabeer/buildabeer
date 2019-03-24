import { Component, OnInit } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';

@Component({
  selector: 'app-fermentation-runner',
  templateUrl: './fermentation-runner.component.html',
  styleUrls: ['./fermentation-runner.component.scss']
})
export class FermentationRunnerComponent implements OnInit {

  f_quant = this._designer.recipe.batch_size;
  f_grav = this._designer.getEstimatedOG();
  f_aer = 'none';
  f_days = this._designer.recipe.primary_ferm_days;
  f_second_days = this._designer.recipe.secondary_ferm_days;
  f_temp = this._designer.recipe.primary_ferm_temp;

  constructor(public _designer: DesignerService) { }

  ngOnInit() {
  }

}
