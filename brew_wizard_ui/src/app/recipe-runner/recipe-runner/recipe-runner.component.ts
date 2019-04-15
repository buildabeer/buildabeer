import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';
import { NewHistoryService } from '../new_history.service';
import * as $ from 'jquery';
import { INewHistory } from '../new_history';

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
  history: INewHistory = {
    id: null,
    recipe_id: null,
    recipe_name: null,
    brew_date: null,
    ingredient_list: null,

    hlt_histories_attributes: { id: null, hlt_temp: null, hlt_quantity: null, agent_list: null, hlt_notes: null },
    mash_histories_attributes: { id: null, hlt_addition: null, hlt_addition_temp: null, ingredient_list: null, 
                                ph_addition: null, mash_notes: null },
    mash_step_histories_attributes: { id: null, mash_history_id: null, step_counter: null, step_temperature: null,
                                     step_minutes: null, step_water_temperature: null, step_water_quantity: null }[],
    sparge_histories_attributes: { id: null, sparge_temperature: null, sparge_quantity: null, ingredient_list: null,
                                  sparge_notes: null },
    boil_histories_attributes: { id: null, pre_boil_gravity: null, pre_boil_quantity: null, boil_minutes: null, 
                                ingredient_list: null, gravity_additions: null, boil_notes: null },
    chill_histories_attributes: { id: null, chill_method: null, chill_minutes: null, ingredient_list: null, chill_notes: null },
    fermentation_histories_attributes: { id: null, wort_quantity: null, fermentation_days: null, original_gravity: null,
                                        fermentation_temperature: null, aeration_method: null, aeration_minutes: null,
                                        secondary_ferm_days: null, ingredient_list: null, fermentation_notes: null },
    reminder_histories_attributes: { id: null, possible_reminders: null, added_reminders: null, reminder_notes: null }
  };

  constructor(public _designer: DesignerService, public _newHistoryService: NewHistoryService) { }

  ngOnInit() {
    this._newHistoryService.createHistory(history)
      .subscribe((res) => {
        this.history.id = res.id;
        this.history.hlt_histories_attributes.id = res.hlt_histories_attributes.id
        this.history.mash_histories_attributes.id = res.mash_histories_attributes.id
        this.history.sparge_histories_attributes.id = res.sparge_histories_attributes.id
        this.history.boil_histories_attributes.id = res.boil_histories_attributes.id
        this.history.chill_histories_attributes.id = res.chill_histories_attributes.id
        this.history.fermentation_histories_attributes.id = res.fermentation_histories_attributes.id
        this.history.reminder_histories_attributes.id = res.reminder_histories_attributes.id
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error processing your request, please try again later.');
        }
        console.error(error);
      });
  }

  updateHistory(save: boolean) {
    this._newHistoryService.editHistory(history)
      .subscribe((res) => {
        if (save) {
          window.alert("History saved.");
        }
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          window.alert('There was an error processing your request, please try again later.');
        }
        console.error(error);
      });
  }

  setNextStep() {
    switch (this.currentStep) {
      case 'water':
        if (this._designer.recipe.recipe_type !== 'Extract') {
          this.currentStep = 'mash';
        } else {
          this.currentStep = 'boil';
        }
        break;
      case 'mash':
        if (this._designer.recipe.recipe_type !== 'Extract') {
          this.currentStep = 'sparge';
        } else {
          this.currentStep = 'boil';
        }
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
        if (this._designer.recipe.recipe_type !== 'Extract') {
          this.currentStep = 'mash';
        } else {
          this.currentStep = 'water';
        }
        break;
      case 'boil':
        if (this._designer.recipe.recipe_type !== 'Extract') {
          this.currentStep = 'sparge';
        } else {
          this.currentStep = 'water';
        }
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

    let element: HTMLElement = document.getElementById(`pills-runner-${this.currentStep}-tab`) as HTMLElement;
    element.click();
  }

  finish() {
    this.onFinish.emit({});
  }
}
