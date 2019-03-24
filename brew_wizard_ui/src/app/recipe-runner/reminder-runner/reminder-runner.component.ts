import { Component, OnInit } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';
import { UserService } from '../../user/user.service';
import { ICalendarEvent } from '../../user/calendar-event';

@Component({
  selector: 'app-reminder-runner',
  templateUrl: './reminder-runner.component.html',
  styleUrls: ['./reminder-runner.component.scss']
})
export class ReminderRunnerComponent implements OnInit {

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

  constructor(public _designer: DesignerService, private _userService: UserService) { }

  ngOnInit() {
    this.emailReminders = {
      hops: Array(this.dryhops.length).fill(true),
      primary_fermentation: !this._designer.recipe.secondary_fermentation,
      secondary_fermentation: this._designer.recipe.secondary_fermentation,
      secondary_yeast: Array(this.secondary_yeast.length).fill(true),
      primary_misc: Array(this.primary_miscs.length).fill(true),
      secondary_misc: Array(this.secondary_miscs.length).fill(true),
      bottling_misc: Array(this.bottling_miscs.length).fill(true)
    };
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
}
