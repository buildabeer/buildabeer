import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() set timer_amount(value: number) {
    this.timerAmount = value;
    if (!this.interval_running) {
      this.timer = value;
    }
  }

  @Input()
  alarms: { key: number, message: string }[];

  timer = 0;
  start_timer = 0;
  interval_running = false;
  timerAmount = 0;
  timerInterval: any;
  audio: any;
  start_time: any;

  constructor() { }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '../../../assets/sounds/alarm.mp3';
    this.audio.loop = true;
    this.audio.load();
  }

  stopInterval() {
    this.interval_running = false;
    clearInterval(this.timerInterval);
    this.stopSound();
  }

  startInterval() {
    this.interval_running = true;
    this.start_time = new Date();
    this.start_timer = this.timer;
    this.timerInterval = setInterval(() => {
      var new_time: Date = new Date();
      // this.timer = this.timer - 1;
      this.timer = this.start_timer - Math.floor((new_time.getTime() - this.start_time.getTime()) / 1000);
      // this.startTime = newTime;
      if (this.timer === 0) {
        this.playSound();
      }
      for (const key in this.alarms) {
        if (Number(key) >= this.timer) {
          this.playSound();
          window.alert('You should make the following miscellaneous additions:' + this.alarms[key]);
          this.stopSound();
          delete this.alarms[key];
        }
      }
    }, 250);
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
