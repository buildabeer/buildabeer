import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-recipe-runner',
  templateUrl: './recipe-runner.component.html',
  styleUrls: ['./recipe-runner.component.scss']
})
export class RecipeRunnerComponent implements OnInit {

  @Output()
  onFinish = new EventEmitter();

  currentStep = 'water';
  hlt_water = this._designer.getMashWaterInfo().step_info[0].water_amount;

  constructor(public _designer: DesignerService) { }

  ngOnInit() {
  }

  setNextStep() {
    switch (this.currentStep) {
      case 'water':
        this.currentStep = 'mash';
        break;
      case 'mash':
        this.currentStep = 'sparge';
        break;
      case 'sparge':
        this.currentStep = 'boil';
        break;
      case 'boil':
        this.currentStep = 'chill';
        break;
      case 'chill':
        this.currentStep = 'fermentation';
        break;
      case 'fermentation':
        this.currentStep = 'reminder';
        break;
      default:
        this.currentStep = 'water';
        break;
    }

    let element: HTMLElement = document.getElementById(`pills-runner-${this.currentStep}-tab`) as HTMLElement;
    element.click();
  }

  setPreviousStep() {
    switch (this.currentStep) {
      case 'mash':
        this.currentStep = 'water';
        break;
      case 'sparge':
        this.currentStep = 'mash';
        break;
      case 'boil':
        this.currentStep = 'sparge';
        break;
      case 'chill':
        this.currentStep = 'boil';
        break;
      case 'fermentation':
        this.currentStep = 'chill';
        break;
      case 'reminder':
        this.currentStep = 'fermentation';
        break;
      default:
        this.currentStep = 'reminder';
        break;
    }

    let element = document.getElementById(`pills-runner-${this.currentStep}-tab`) as HTMLElement;
    element.click();

  }
}
