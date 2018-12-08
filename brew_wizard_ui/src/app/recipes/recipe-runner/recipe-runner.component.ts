import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { DesignerService } from '../designer.service';
import { UserService } from '../../user/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ICalendarEvent } from '../../user/calendar-event';
import { IHistory } from '../../user/history';

export enum Step {
  Mashing = 1,
  Sparging,
  Boiling,
  Chilling,
  Fermenting,
  Reminders
}

@Component({
  selector: 'app-recipe-runner',
  templateUrl: './recipe-runner.component.html',
  styleUrls: ['./recipe-runner.component.scss']
})
export class RecipeRunnerComponent implements OnInit {

  @Input()
  startingStep: Step;

  @Output()
  onFinish = new EventEmitter();

  history: IHistory;

  Step = Step;
  timer = 0;
  timerAmount = 0;
  timerInterval: any;
  audio: any;
  currentStep: Step;
  mashStep = 0;
  hopAlarms: {} = {};
  hopModal: NgbModalRef;
  // startTime: Date = new Date();
  miscBoilAlarms: {} = {};

  dryhops = this._designer.getHopByUsage('dryhop');
  secondary_yeast = this._designer.getUsedYeast(2);
  primary_miscs = this._designer.getUsedMiscellaneous('Primary');
  secondary_miscs = this._designer.getUsedMiscellaneous('Secondary');
  bottling_miscs = this._designer.getUsedMiscellaneous('Bottling');
  emailReminders: { hops: boolean[], primary_fermentation: boolean,
    secondary_fermentation: boolean, secondary_yeast: boolean[],
    secondary_misc: boolean[], bottling_misc: boolean[], primary_misc: boolean[]} =
  {
    hops: [true],
    primary_fermentation: true,
    secondary_fermentation: true,
    secondary_yeast: [true],
    secondary_misc: [true],
    bottling_misc: [true],
    primary_misc: [true]
  };

  boil_gallons: number = this._designer.roundHundredth(this._designer.checkGallonsToLiters(this._designer.estimatePreGallons()));

  recalculator: { og: number, addition_type: string, gallons: number } = {
    og: this._designer.roundThousandth(this._designer.getEstimatedPreboilPoints() / this._designer.estimatePreGallons() / 1000 + 1),
    addition_type: 'dme',
    gallons: this.boil_gallons };

  ph_recalculator: { ph: number, addition_type: string, gallons: number } = {
    addition_type: 'phosphoric',
    ph: this._designer.getEstimatedPh(),
    gallons: this._designer.roundHundredth(this._designer.checkGallonsToLiters(this._designer.inputConversion(this._designer.recipe.mash_ratio, 'ratio') * this._designer.getTotalGrainWeight()))
  };

  history_collapse: boolean;
  ph_collapse: boolean;
  ph_adjustment = 0;
  gravity_collapse: boolean;
  gravity_adjustment = 0;
  boil_collapse: boolean;

  constructor(public _designer: DesignerService, private _modalService: NgbModal,
    private _userService: UserService) { }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '../../../assets/sounds/alarm.mp3';
    this.audio.loop = true;
    this.audio.load();

    this.currentStep = this.startingStep; // Step.Mashing;
    this.mashStep = 0;
    this.timer = this.getMashStep(this.mashStep).step_time * 60;
    this.timerAmount = this.getMashStep(this.mashStep).step_time * 60;

    this.emailReminders = {
      hops: Array(this.dryhops.length).fill(true),
      primary_fermentation: !this._designer.recipe.secondary_fermentation,
      secondary_fermentation: this._designer.recipe.secondary_fermentation,
      secondary_yeast: Array(this.secondary_yeast.length).fill(true),
      primary_misc: Array(this.primary_miscs.length).fill(true),
      secondary_misc: Array(this.secondary_miscs.length).fill(true),
      bottling_misc: Array(this.bottling_miscs.length).fill(true)
    };

    this.ph_collapse = false;
    this.gravity_collapse = false;
    this.boil_collapse = false;
    this.history_collapse = true;

    this.history = {
      og: this._designer.getEstimatedOG(),
      fg: null,
      gallons: this._designer.checkGallonsToLiters(this._designer.recipe.batch_size),
      ingredients: this._designer.getIngredientList(),
      notes: '',
      recipe_name: this._designer.recipe.name,
      recipe_id: this._designer.recipe.id,
      brew_date: new Date(),
      id: null
    };
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
    this.stopSound();
  }

  recalculateBoilTime(): void {
    const gallons = this._designer.inputConversion(this.boil_gallons, 'liquid') - this._designer.used_equipment.wl_boil;
    const new_time_hours = (gallons - this._designer.recipe.batch_size) / this._designer.used_equipment.boil_rate;
    this.timer = Math.floor(new_time_hours * 60 * 60);
  }

  finish(): void {
    this.addReminders();

    this.history.gallons = this._designer.inputConversion(this.history.gallons, 'liquid');

    this._userService.createHistory(this.history)
      .subscribe((res) => {
        window.alert('Saved to history.');
      }, (error) => {
        if (error.status === 401) {
          window.alert('You must log in to save history.');
        } else {
          window.alert('There was an error adding to the history, please try again later.');
        }
        console.error(error);
      });

    this.onFinish.emit({});
  }

  addReminders(): void {
    const calendar_events: ICalendarEvent[] = [];
    const current_date: Date = new Date();
    const login_error = false;
    const other_errors: string[] = [];

    this.emailReminders.hops.forEach((hop, i) => {
      if (hop) {

        calendar_events[calendar_events.length] = {
          name: 'Dry hop addition to ' + this._designer.recipe.name + ' brewed on ' + new Date().toJSON().slice(0, 10),
          id: null,
          description: this._designer.roundPointOne(this.dryhops[i].quantity) +
                ' ' + (this._designer.measurement.hops === 'us' ? 'ounces' : 'grams') +
                ' of ' + this.dryhops[i].name + ' (' + this.dryhops[i].form +
                ') are added during secondary fermentation for ' + this.dryhops[i].time + ' days.',
          calendar_start: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
          calendar_end: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + this.dryhops[i].time)),
          color: '#D84d38',
          calendar_reminders_attributes: [
            {
              id: null,
              reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
              sent: false
            },
            {
              id: null,
              reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + this.dryhops[i].time)),
              sent: false
            }
          ]
        };
      }
    });

    if (this.emailReminders.primary_fermentation) {
      calendar_events[calendar_events.length] = {
        name: 'Primary fermentation for ' + this._designer.recipe.name + ' brewed on ' + new Date().toJSON().slice(0, 10),
        id: null,
        description: 'Ferment for ' + this._designer.recipe.primary_ferm_days +
              ' days at ' + this._designer.recipe.primary_ferm_temp + '&deg;' +
              (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + '.',
        calendar_start: current_date,
        calendar_end: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
        color: '#D84d38',
        calendar_reminders_attributes: [
          {
            id: null,
            reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
            sent: false
          }
        ]
      };
    } else if (this.emailReminders.secondary_fermentation) {
      calendar_events[calendar_events.length] = {
        name: 'Secondary fermentation for ' + this._designer.recipe.name + ' brewed on ' + new Date().toJSON().slice(0, 10),
        id: null,
        description: 'After primary (' + this._designer.recipe.primary_ferm_days +
              ' days), secondary fermentation for ' + this._designer.recipe.secondary_ferm_days +
              ' days at ' + this._designer.recipe.secondary_ferm_temp +
              '&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + '.',
        calendar_start: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
        calendar_end: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + this._designer.recipe.secondary_ferm_days)),
        color: '#D84d38',
        calendar_reminders_attributes: [
          {
            id: null,
            reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
            sent: false
          },
          {
            id: null,
            reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + this._designer.recipe.secondary_ferm_days)),
            sent: false
          }
        ]
      };
    }

    this.emailReminders.secondary_yeast.forEach((yeast, i) => {
      if (yeast) {
        const reminder_start_date = new Date();

        calendar_events[calendar_events.length] = {
          name: 'Yeast addition to ' + this._designer.recipe.name + ' brewed on ' + new Date().toJSON().slice(0, 10),
          id: null,
          description: 'In secondary, use ' + this._designer.roundPointOne(this.secondary_yeast[i].quantity) +
          ' pkgs of ' + this.secondary_yeast[i].name + (this.secondary_yeast[i].lab ? ' - ' + this.secondary_yeast[i].lab : ''),
          calendar_start: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
          calendar_end: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + this._designer.recipe.secondary_ferm_days)),
          color: '#D84d38',
          calendar_reminders_attributes: [
            {
              id: null,
              reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
              sent: false
            }
          ]
        };
      }
    });

    this.emailReminders.primary_misc.forEach((misc, i) => {
      if (misc) {
        const reminder_start_date = new Date();
        let add_days = this.primary_miscs[i].time;
        switch (this.primary_miscs[i].time_label) {
          case 'Hours':
            add_days = add_days / 24;
            break;
          case 'Minutes':
            add_days = add_days / 24 / 60;
            break;
        }

        calendar_events[calendar_events.length] = {
          name: 'Miscellaneous addition to ' + this._designer.recipe.name + ' brewed on ' + new Date().toJSON().slice(0, 10),
          id: null,
          description: 'In secondary, add ' + this._designer.roundPointOne(this.primary_miscs[i].quantity) +
          ' ' + this.primary_miscs[i].quantity_label + ' of ' + this.primary_miscs[i].name + ' for ' +
          this.primary_miscs[i].time + ' ' + this.primary_miscs[i].time_label,
          calendar_start: new Date((new Date()).setDate(current_date.getDate())),
          calendar_end: new Date((new Date()).setDate(current_date.getDate() + add_days)),
          color: '#D84d38',
          calendar_reminders_attributes: [
            {
              id: null,
              reminder_time: new Date((new Date()).setDate(current_date.getDate() + add_days)),
              sent: false
            }
          ]
        };
      }
    });

    this.emailReminders.secondary_misc.forEach((misc, i) => {
      if (misc) {
        const reminder_start_date = new Date();
        let add_days = this.secondary_miscs[i].time;
        switch (this.secondary_miscs[i].time_label) {
          case 'Hours':
            add_days = add_days / 24;
            break;
          case 'Minutes':
            add_days = add_days / 24 / 60;
            break;
        }

        calendar_events[calendar_events.length] = {
          name: 'Miscellaneous addition to ' + this._designer.recipe.name + ' brewed on ' + new Date().toJSON().slice(0, 10),
          id: null,
          description: 'In secondary, add ' + this._designer.roundPointOne(this.secondary_miscs[i].quantity) +
          ' ' + this.secondary_miscs[i].quantity_label + ' of ' + this.secondary_miscs[i].name + ' for ' +
          this.secondary_miscs[i].time + ' ' + this.secondary_miscs[i].time_label,
          calendar_start: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
          calendar_end: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + add_days)),
          color: '#D84d38',
          calendar_reminders_attributes: [
            {
              id: null,
              reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
              sent: false
            },
            {
              id: null,
              reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + add_days)),
              sent: false
            }
          ]
        };
      }
    });

    this.emailReminders.bottling_misc.forEach((misc, i) => {
      if (misc) {
        const reminder_start_date = new Date();
        let add_days = this.bottling_miscs[i].time;
        switch (this.bottling_miscs[i].time_label) {
          case 'Hours':
            add_days = add_days / 24;
            break;
          case 'Minutes':
            add_days = add_days / 24 / 60;
            break;
        }

        calendar_events[calendar_events.length] = {
          name: 'Miscellaneous addition to ' + this._designer.recipe.name + ' brewed on ' + new Date().toJSON().slice(0, 10),
          id: null,
          description: 'For bottling, add ' + this._designer.roundPointOne(this.bottling_miscs[i].quantity) +
          ' ' + this.bottling_miscs[i].quantity_label + ' of ' + this.bottling_miscs[i].name + ' for ' +
          this.bottling_miscs[i].time + ' ' + this.bottling_miscs[i].time_label,
          calendar_start: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
          calendar_end: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + add_days)),
          color: '#D84d38',
          calendar_reminders_attributes: [
            {
              id: null,
              reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days)),
              sent: false
            },
            {
              id: null,
              reminder_time: new Date((new Date()).setDate(current_date.getDate() + this._designer.recipe.primary_ferm_days + add_days)),
              sent: false
            }
          ]
        };
      }
    });

    // calendar_events.forEach((event) => {
    if (calendar_events.length === 0) {
      return;
    }
    this._userService.createEvents(calendar_events)
      .subscribe((res) => {
        window.alert('Events added.');
      }, (error) => {
        console.error(error);
        console.error(JSON.parse(error._body));
        if (error.status === 401) {
          window.alert('You must log in first.');
        } else {
          const errors = [];
          JSON.parse(error._body).forEach(err => {
            if (Object.keys(err).length !== 0) {
              Object.keys(err).forEach(err_key => {
                errors.push(err_key + ': ' + err[err_key]);
              });
            }
          });
          window.alert('There was an error adding the events.\n' + errors.join('\n'));
        }
      });
    // })
  }

  getMaltDisplay(usage: string): { name: string, quantity: number }[] {
    const malts: { name: string, quantity: number }[] = [];

    this._designer.recipe.recipe_malts_attributes.forEach((malt, i) => {
      if (malt.malt_usage === usage) {
        malts.push({ name: this._designer.used_malts[i].name, quantity: malt.quantity });
      }
    });

    return malts;
  }

  calculatePhAdjust() {
    this.ph_adjustment = this._designer.getPhDrop(this.ph_recalculator.addition_type, this.ph_recalculator.ph, this.ph_recalculator.gallons);
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

  setupBoilAlarms() {
    this.hopAlarms = {};
    const hops = this._designer.getHopByUsage('boil');
    hops.forEach((hop) => {
      const time = Math.floor(hop.time * 60);
      if (this.hopAlarms[time] != undefined) {
        this.hopAlarms[time].push('\n' + hop.quantity + ' ' + (this._designer.measurement.hops === 'us' ? 'oz' : 'g') + ' of ' + hop.name + ' (' + hop.form + ')');
      } else {
        this.hopAlarms[time] = [('\n' + hop.quantity + ' ' + (this._designer.measurement.hops === 'us' ? 'oz' : 'g') + ' of ' + hop.name + ' (' + hop.form + ')')];
      }
    });

    this.miscBoilAlarms = {};
    const miscs = this._designer.getUsedMiscellaneous('Boil');
    miscs.forEach((misc) => {
      let time = Math.floor(misc.time * 60);
      if (misc.time_label === 'Hours') {
        time = time * 60;
      } else if (misc.time_label === 'Days') {
        time = time * 60 * 24;
      }
      if (this.miscBoilAlarms[time] != undefined) {
        this.miscBoilAlarms[time].push('\n' + misc.quantity + ' ' + misc.quantity_label + ' of ' + misc.name + ' should now be added.');
      } else {
        this.miscBoilAlarms[time] = [('\n' + misc.quantity + ' ' + misc.quantity_label + ' of ' + misc.name + ' should now be added.')];
      }
    });
  }

  nextStep(): void {
    if (this.currentStep === Step.Mashing) {
      if (this.mashStep + 1 < this._designer.getMashWaterInfo().step_info.length) {
        this.mashStep += 1;
        this.timerAmount = this.getMashStep(this.mashStep).step_time * 60;
        return;
      } else if (this._designer.recipe.sparge_type !== 'none' && this._designer.recipe.recipe_type !== 'Extract') {
        this.currentStep = Step.Sparging;
        this.timerAmount = 60 * 60;
        const fwh = [];
        this._designer.getHopByUsage('fwh').forEach((hop) => {
          fwh.push(this._designer.roundPointOne(hop.quantity) + ' ' + (this._designer.measurement.hops === 'us' ? 'oz' : 'g') + ' of ' + hop.name + ' (' + hop.form + ').');
        });
      } else {
        this.currentStep = Step.Boiling;
        this.timerAmount = this._designer.recipe.boil_time * 60;
        this.setupBoilAlarms();
      }
    } else if (this.currentStep === Step.Sparging) {
      this.currentStep = Step.Boiling;
      this.timerAmount = this._designer.recipe.boil_time * 60;
      this.setupBoilAlarms();
    } else if (this.currentStep === Step.Boiling) {
      this.currentStep = Step.Chilling;
      this.timerAmount = 20 * 60;
      if (this._designer.getHopByUsage('knockout').length != 0) {
        const fwh = [];
        this._designer.getHopByUsage('fwh').forEach((hop) => {
          fwh.push(this._designer.roundPointOne(hop.quantity) + ' ' + (this._designer.measurement.hops === 'us' ? 'oz' : 'g') + ' of ' + hop.name + ' (' + hop.form + ').');
        });
        window.alert('At this point add your knockout hops.\n' + fwh.join('\n'));
      }
    } else if (this.currentStep === Step.Chilling) {
      this.currentStep = Step.Fermenting;
      this.timerAmount = 5 * 60;
    } else if (this.currentStep === Step.Fermenting) {
      this.currentStep = Step.Reminders;
      this.timerAmount = 0;
    }
    this.timer = Math.floor(this.timerAmount);
    this.timerAmount = Math.floor(this.timerAmount);
    clearInterval(this.timerInterval);
    this.stopSound();
  }

  previousStep(): void {
    if (this.currentStep === Step.Mashing) {
      if (this.mashStep > 0) {
        this.mashStep -= 1;
        this.timerAmount = this.getMashStep(this.mashStep).step_time * 60;
        return;
      } else {
        return;
      }
    } else if (this.currentStep === Step.Sparging) {
      this.currentStep = Step.Mashing;
      this.mashStep = this._designer.getMashWaterInfo().step_info.length - 1;
      this.timerAmount = this.getMashStep(this.mashStep).step_time * 60;
    } else if (this.currentStep === Step.Boiling) {
      if ((this._designer.recipe.sparge_type === 'none' || this._designer.recipe.recipe_type === 'Extract')) {
        this.currentStep = Step.Mashing;
        this.mashStep = this._designer.getMashWaterInfo().step_info.length - 1;
        this.timerAmount = this.getMashStep(this.mashStep).step_time * 60;
      } else {
        this.currentStep = Step.Sparging;
        this.timerAmount = 60 * 60;
        const fwh = [];
        this._designer.getHopByUsage('fwh').forEach((hop) => {
          fwh.push(this._designer.roundPointOne(hop.quantity) + ' ' + (this._designer.measurement.hops === 'us' ? 'oz' : 'g') + ' of ' + hop.name + ' (' + hop.form + ').');
        });
      }
    } else if (this.currentStep === Step.Chilling) {
      this.currentStep = Step.Boiling;
      this.timerAmount = this._designer.recipe.boil_time * 60;
      this.setupBoilAlarms();
    } else if (this.currentStep === Step.Fermenting) {
      this.currentStep = Step.Chilling;
      this.timerAmount = 20 * 60;
      if (this._designer.getHopByUsage('knockout').length != 0) {
        const fwh = [];
        this._designer.getHopByUsage('fwh').forEach((hop) => {
          fwh.push(this._designer.roundPointOne(hop.quantity) + ' ' + (this._designer.measurement.hops === 'us' ? 'oz' : 'g') + ' of ' + hop.name + ' (' + hop.form + ').');
        });
        window.alert('At this point add your knockout hops.\n' + fwh.join('\n'));
      }
    } else if (this.currentStep === Step.Reminders) {
      this.currentStep = Step.Fermenting;
      this.timerAmount = 5 * 60;
    }
    this.timer = Math.floor(this.timerAmount);
    this.timerAmount = Math.floor(this.timerAmount);
    clearInterval(this.timerInterval);
    this.stopSound();
  }

  getStepText(current_step: Step, mash_step: number): string {
    if (current_step === Step.Mashing) {
      if (this._designer.recipe.recipe_type === 'Extract') {
        return 'When brewing with extract, you will want to raise the temperature \
        of your entire amount of water up to 140&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + ', place your grain in your \
        steeping bag (if any, otherwise just add extract and go to next stage), and let it steep in the water while you continue to raise \
        the temperature to 170&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + '. This should ideally take about 20 minutes.';
      } else if (this._designer.recipe.recipe_type === 'Brew in a Bag'
        && this._designer.recipe.mash_type === 'none') {
        return 'You will want to raise the temperature of your entire amount \
        of water (' + this._designer.roundPointOne(this.getMashStep(mash_step).water_amount / 4) + ' gallons) up to the \
        strike temperature of ' + this._designer.roundPointOne(this._designer.checkFahrenheitToCelsius(this.getMashStep(mash_step).water_temp)) + '&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + '. Then, you will \
        add your steeping bag containing your entire quantity of grain.';
      } else if (mash_step === 0) {
        return 'You will want to bring ' + this._designer.roundPointOne(this.getMashStep(mash_step).water_amount) + ' ' + (this._designer.measurement.liquid === 'us' ? 'quarts' : 'liters') + '\
        of water to ' + this._designer.roundPointOne(this._designer.checkFahrenheitToCelsius(this.getMashStep(mash_step).water_temp)) + '&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + '. Then add your grain, \
        making sure to stir as you add to prevent dough balls.';
      } else if (this._designer.recipe.mash_type === 'step') {
        return 'You will want to bring ' + this._designer.roundPointOne(this.getMashStep(mash_step).water_amount) + ' ' + (this._designer.measurement.liquid === 'us' ? 'quarts' : 'liters') + '\
        of water to a boil. Once it has reached a boil you will add it to the \
        mash to raise it to ' + this._designer.checkFahrenheitToCelsius(this.getMashStep(mash_step).step_temp) + '&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + '.';
      } else if (this._designer.recipe.mash_type === 'decoction') {
        return 'You will want to remove ' + this._designer.roundPointOne(this.getMashStep(mash_step).water_amount) + '% \
        of the mash and bring it to the step temperature for the timer amount in another pot, then bring it to a boil, this \
        invokes Maillard browning reactions. You will then re-add it to the \
        mash to raise the temperature to this stages temperature.';
      }
    } else if (current_step === Step.Sparging) {
      if (this._designer.recipe.sparge_type === 'batch') {
        return 'When batch sparging, you will drain all wort currently in \
        your lauter tun into your boil kettle. Then you will add in the \
        remaining ' + this._designer.roundPointOne(this._designer.getMashWaterInfo().sparge_amount) +
        ' gallons, at ' + this._designer.roundPointOne(this._designer.checkFahrenheitToCelsius(170)) + '&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + ', for 20 minutes. Then drain the wort again into your boil \
        kettle for the next step.';
      } else if (this._designer.recipe.mash_type === 'fly') {
        return 'When fly sparging, you will very slowly, over the course of \
        an hour, drain the wort currently in your lauter tun into your boil \
        kettle. While this is draining, you will slowly add in the \
        remaining ' + this._designer.roundPointOne(this._designer.getMashWaterInfo().sparge_amount) +
        ' gallons of sparge water, at ' + this._designer.roundPointOne(this._designer.checkFahrenheitToCelsius(170)) + '&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + ', at the same rate you are removing wort.';
      }
    } else if (current_step === Step.Boiling) {
      return 'Bring the wort to a boil for the designated time. \
      During this time you will receive reminders to add hops at their \
      designated times. If any extract or sugar is used in this step, be sure \
      to mix it in thoroughly.\n\nReminder: It would be good to remove any yeast \
      packets from the fridge at this time.';
    } else if (current_step === Step.Chilling) {
      return 'After boiling, the wort must be brought to a temperature that \
      the yeast can be used at. However, once the temperature reaches \
      ' + this._designer.roundPointOne(this._designer.checkFahrenheitToCelsius(160)) + '&deg;' + (this._designer.measurement.temperature === 'us' ? 'F' : 'C') + ' it is susceptible to contamination. To avoid this the wort \
      should be chilled as quickly as possible at that point. This can be done \
      with an ice bath, immersion chiller, or counter-flow chiller. Pitching \
      temperature (' + (this._designer.measurement.temperature === 'us' ? '5 to 10&deg;F' : '3 to 6&deg;C') + ' over your fermenting temperature) should be \
      reached within 30 minutes.';
    } else if (current_step === Step.Fermenting) {
      return 'With the wort cooled, you can transfer it to your carboy. \
      Once in the carboy it is time to add the yeast along with \
      any yeast nutrients that you plan on using. It is good to add air to \
      the wort so that the yeast can use the oxygen in fermentation. This \
      can be achieved through specific air filtration systems, or by shaking \
      the wort in the carboy for 5-10 minutes.';
    } else if (current_step === Step.Reminders) {
      return 'It is time to wait! Fermentation generally takes 1-2 weeks. You \
      will be able to tell when it has begun when bubbles start going through your air lock. \
      It is good to monitor the fermentation in case it gets stuck, or to \
      move to the next stage of secondary fermentation, bottling, or kegging \
      when it is complete. You can tell that either of these events as \
      happened when the bubbles in the air lock have slowed significantly \
      (once every 5-10 seconds) or stopped completely. You can then take a \
      sample of the beer out, measure the gravity, and decide where to go \
      from there (more yeast or nutrients, or bottle/keg).';
    }

    return 'Step not found.';
  }

  getNextStepText(): string {
    if (this.currentStep === Step.Mashing && this.mashStep + 1 < this._designer.getMashWaterInfo().step_info.length) {
      return this.getStepText(this.currentStep, this.mashStep + 1);
    } else if (this.currentStep + 1 === Step.Sparging && (this._designer.recipe.sparge_type === 'none' || this._designer.recipe.recipe_type === 'Extract')) {
      return this.getStepText(this.currentStep + 2, 0);
    } else {
      return this.getStepText(this.currentStep + 1, 0);
    }
  }

  getNextStepName(): string {
    if (this.currentStep === Step.Mashing && this.mashStep + 1 < this._designer.getMashWaterInfo().step_info.length) {
      return this.getMashStep(this.mashStep + 1).step_name;
    } else if (this.currentStep + 1 === Step.Sparging && (this._designer.recipe.sparge_type === 'none' || this._designer.recipe.recipe_type === 'Extract')) {
      return Step[this.currentStep + 2];
    } else {
      return Step[this.currentStep + 1];
    }
  }

  getPreviousStepName(): string {
    if (this.currentStep === Step.Mashing && this.mashStep > 0) {
      return this.getMashStep(this.mashStep - 1).step_name;
    } else if (this.currentStep - 1 === Step.Sparging && (this._designer.recipe.sparge_type === 'none' || this._designer.recipe.recipe_type === 'Extract')) {
      return Step[this.currentStep - 2];
    } else {
      return Step[this.currentStep - 1];
    }
  }

  getStepNumber() {
    return Step[this.currentStep];
  }

  getMashStep(mash_counter: number) {
    return this._designer.getMashWaterInfo().step_info[mash_counter];
  }

  stopInterval() {
    clearInterval(this.timerInterval);
    this.stopSound();
  }

  startInterval() {
    // this.startTime = new Date();
    this.timerInterval = setInterval(() => {
      // var newTime = new Date();
      this.timer = this.timer - 1; // Math.floor((newTime.getTime() - this.startTime.getTime()) / 1000);
      // this.startTime = newTime;
      if (this.timer === 0) {
        this.playSound();
      }
      if (this.currentStep === Step.Boiling) {
        for (const key in this.hopAlarms) {
          if (Number(key) >= this.timer) {
            this.playSound();
            window.alert('You should make the following hop additions:' + this.hopAlarms[key]);
            this.stopSound();
            delete this.hopAlarms[key];
          }
        }
        for (const key in this.miscBoilAlarms) {
          if (Number(key) >= this.timer) {
            this.playSound();
            window.alert('You should make the following miscellaneous additions:' + this.miscBoilAlarms[key]);
            this.stopSound();
            delete this.miscBoilAlarms[key];
          }
        }
      }
    }, 1000);
  }

  resetInterval() {
    this.stopInterval();
    this.timer = this.timerAmount;
  }

  playSound() {
    this.audio.play();
  }

  stopSound() {
    this.audio.pause();
  }

  getHours(): number {
    return Math.max(Math.floor(this.timer / 3600), 0);
  }

  getMinutes(): number {
    return Math.max(Math.floor(this.timer / 60 % 60), 0);
  }

  getSeconds(): number {
    return Math.max(this.timer % 60, 0);
  }
}
