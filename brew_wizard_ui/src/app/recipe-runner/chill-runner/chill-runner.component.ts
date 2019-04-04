import { Component, OnInit } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';

@Component({
  selector: 'app-chill-runner',
  templateUrl: './chill-runner.component.html',
  styleUrls: ['./chill-runner.component.scss']
})
export class ChillRunnerComponent implements OnInit {

  timer = 20;
  chill_method = 'ice';
  khops = this._designer.getHopByUsage('knockout');
  hhops = this._designer.getHopByUsage('hopback');
  whops = this._designer.getHopByUsage('whirlpool');


  dryhops = this._designer.getHopByUsage('dryhop');

  constructor(public _designer: DesignerService) { }

  ngOnInit() {
    console.log("this.hhops")
    console.log(this.hhops)
    console.log("this.whops")
    console.log(this.whops)
    console.log("dryhops")
    console.log(this.dryhops)
    console.log('all')
    console.log(this._designer.recipe.recipe_hops_attributes);
  }

}
