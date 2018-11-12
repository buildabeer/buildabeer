import { Component, ChangeDetectionStrategy, ViewChild,
  TemplateRef, ViewEncapsulation } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth,
  isSameDay, isSameMonth, addHours, addWeeks, addMonths } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction,
  CalendarEventTimesChangedEvent } from 'angular-calendar';
import { UserService } from '../user.service';
import { ICalendarEvent } from '../calendar-event';
import { ICalendarReminder } from '../calendar-reminder';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'], encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('addEvent') addEvent: TemplateRef<any>;

  addEventModal: NgbModalRef;

  view: string = 'month';
  viewDate: Date = new Date();
  offset: number = new Date().getTimezoneOffset();

  newEvent: ICalendarEvent =
  {
    name: "",
    id: null,
    description: "",
    calendar_start: new Date(),
    calendar_end: new Date(),
    color: '#ad2121',
    calendar_reminders_attributes: []
  }

  modalData: {
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-edit"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openEditEvent(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this._userService.deleteEvent(Number(event.id));
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private _userService: UserService) {
    this.getEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  getEvents(): void {
    var start: Date;
    var end: Date;

    if(this.view === 'month') {
      start = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 0)
      end = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0)
    } else if (this.view === 'week') {
      start = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() - this.viewDate.getDay())
      end = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() - this.viewDate.getDay() + 7)
    } else if (this.view === 'day') {
      start = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate())
      end = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() + 1)
    }

    this._userService.getEvents(start, end)
      .retryWhen((err) => {
        return err.scan((retryCount) => {
          retryCount++;
          if(retryCount < 3) {
            return retryCount;
          } else {
            throw(err);
          }
        }, 0).delay(1000)
      })
      .subscribe(eventData => {
          this.events = [];
          eventData.forEach((event) => {
            this.events.push(
              {
                id: event.id,
                start: new Date(event.calendar_start),
                end: event.calendar_end ? new Date(event.calendar_end) : endOfDay(new Date(event.calendar_start)),
                title: event.name,
                meta: { description: event.description, calendar_reminders_attributes: event.calendar_reminders },
                color: { primary: event.color ? event.color : '#ad2121', secondary: event.color ? event.color : '#ad2121' },
                actions: this.actions,
                resizable: {
                  beforeStart: true,
                  afterEnd: true
                },
                draggable: true
              }
            )
            this.refresh.next();
          })
        },
        error => {
          console.error(error);
      });
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    var oldStart = event.start;
    var oldEnd = event.end;
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();

    var editEvent: ICalendarEvent =
    {
      id: Number(event.id),
      calendar_start: new Date(event.start),
      calendar_end: event.end ? new Date(event.end) : new Date(event.start.getTime() + 15 * 60000),
      name: event.title,
      color: event.color ? event.color.primary : '#ad2121',
      description: event.meta['description'],
      calendar_reminders_attributes: event.meta['calendar_reminders_attributes']
    }

    this._userService.editEvent(editEvent)
      .subscribe((res) => {
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error editting the event, please try again later.");
        }
        console.error(error);
        event.start = oldStart;
        event.end = oldEnd;
        this.refresh.next();
      });
  }

  getDateString(reminder_time): string {
     return new Date(reminder_time).toDateString() + " " + new Date(reminder_time).toLocaleTimeString()
  }

  clearReminder(reminder): void {
    this.newEvent.calendar_reminders_attributes = this.newEvent.calendar_reminders_attributes.filter(iReminder => iReminder !== reminder);
  }

  addReminder(): void {
    var new_reminder: any = { id: null, reminder_time: new Date(this.newEvent.calendar_start), sent: false }
    this.newEvent.calendar_reminders_attributes[this.newEvent.calendar_reminders_attributes.length] = new_reminder;
  }

  clickEvent(event: CalendarEvent): void {
    this.modalData = { event };
    this.modal.open(this.modalContent, { size: 'sm' });
  }

  openAddEvent(addEvent): void {
    this.newEvent =
    {
      name: "",
      id: null,
      description: "",
      calendar_start: new Date(),
      calendar_end: new Date(this.newEvent.calendar_start.getTime() + 15 * 60000),
      color: '#ad2121',
      calendar_reminders_attributes: []
    }
    this.addEventModal = this.modal.open(addEvent, { size: 'lg' });
  }

  createEvent(form: any): void {
    this._userService.createEvent(this.newEvent)
      .subscribe((res) => {

        this.events.push(
          {
            id: JSON.parse(res._body).id,
            start: new Date(this.newEvent.calendar_start),
            end: this.newEvent.calendar_end ? new Date(this.newEvent.calendar_end) : new Date(this.newEvent.calendar_start.getTime() + 15 * 60000),
            title: this.newEvent.name,
            meta: { description: this.newEvent.description, calendar_reminders_attributes: this.newEvent.calendar_reminders_attributes },
            color: { primary: this.newEvent.color ? this.newEvent.color : '#ad2121', secondary: this.newEvent.color ? this.newEvent.color : '#ad2121' },
            actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          }
        )

        this.refresh.next();
        this.addEventModal.close();
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error adding the event, please try again later.");
        }
        console.error(error);
      });
  }

  openEditEvent(event: CalendarEvent): void {
    this.newEvent =
    {
      id: Number(event.id),
      calendar_start: new Date(event.start),
      calendar_end: event.end ? new Date(event.end) : new Date(event.start.getTime() + 15 * 60000),
      name: event.title,
      color: event.color ? event.color.primary : '#ad2121',
      description: event.meta['description'],
      calendar_reminders_attributes: event.meta['calendar_reminders_attributes']
    }

    this.addEventModal = this.modal.open(this.addEvent, { size: 'lg' });
  }

  editEvent(form: any): void {
    this._userService.editEvent(this.newEvent)
      .subscribe((res) => {
        this.events = this.events.filter(iEvent => iEvent.id !== this.newEvent.id);
        this.events.push({
              id: this.newEvent.id,
              start: new Date(this.newEvent.calendar_start),
              end: this.newEvent.calendar_end ? new Date(this.newEvent.calendar_end) : new Date(this.newEvent.calendar_start.getTime() + 15 * 60000),
              title: this.newEvent.name,
              meta: { description: this.newEvent.description, calendar_reminders_attributes: this.newEvent.calendar_reminders_attributes },
              color: { primary: this.newEvent.color ? this.newEvent.color : '#ad2121', secondary: this.newEvent.color ? this.newEvent.color : '#ad2121' },
              actions: this.actions,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              draggable: true
            }
        )
        this.refresh.next();
        this.addEventModal.close();
      }, (error) => {
        if (error.status == "401") {
          window.alert("You must log in first.");
        } else {
          window.alert("There was an error editting the event, please try again later.");
        }
        console.error(error);
      });
  }
}
