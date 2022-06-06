import { Component, OnDestroy, OnInit } from '@angular/core';

interface ClockInfo {
  hour: number;
  minute: number;
  second: number;
  period: 'AM' | 'PM';
  hourHandStyle?: any;
  minuteHandStyle?: any;
  secondHandStyle?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'Synchronized clocks';
  public clockIsAuto: boolean = true;
  public currentClock: ClockInfo = {
    hour: 0,
    minute: 0,
    second: 0,
    period: 'AM',
    hourHandStyle: { transform: `rotate(90deg)` },
    minuteHandStyle: { transform: `rotate(90deg)` },
    secondHandStyle: { transform: `rotate(90deg)` }
  };
  public customClock: ClockInfo = {
    hour: 0,
    minute: 0,
    second: 0,
    period: 'AM',
    hourHandStyle: { transform: `rotate(90deg)` },
    minuteHandStyle: { transform: `rotate(90deg)` },
    secondHandStyle: { transform: `rotate(90deg)` },
  };

  public clockInterval: any;

  constructor() { }

  ngOnInit() {
    if (this.clockIsAuto) {
      this.intervalClock();
    } else {
      this.customClock = this.currentClock;
    }
  }

  changeClockState() {
    this.clockIsAuto = !this.clockIsAuto;
    if (this.clockIsAuto) {
      this.intervalClock();
    } else {
      this.customClock = this.currentClock;
      this.clockInterval && clearInterval(this.clockInterval);
    }
  }

  intervalClock() {
    let date = new Date();
    this.clockInterval = setInterval(() => {
      date = new Date();
      this.currentClock = this.setClock(date.getHours(), date.getMinutes(), date.getSeconds());
    }, 1000);
  }

  setClock(hour: number | null, minute: number | null, second: number | null): ClockInfo {
    hour = !hour || hour == null ? 0 : hour;
    minute = !minute || minute == null ? 0 : minute;
    second = !second || second == null ? 0 : second;
    let period : 'AM' | 'PM' = hour < 12 ? 'AM' : 'PM';
    period = (hour === 24 || hour === 0) ? 'AM' : period;
    hour = hour < 13 ? hour : hour - 12;
    return {
      hour: hour === 0 ? 12 : hour,
      minute: minute,
      second: second,
      period: period,
      hourHandStyle: {
        transform: `rotate(${(hour / 12) * 360 + (minute / 60) * 30 + 90}deg)`
      },
      minuteHandStyle: {
        transform: `rotate(${(minute / 60) * 360 + (second / 60) * 6 + 90}deg)`
      },
      secondHandStyle: {
        transform: `rotate(${(second / 60) * 360 + 90}deg)`
      },
    };
  }

  updateClock(inputName: 'hour' | 'minute' | 'second', event: any) {
    const value = event.target.value;
    if (inputName == 'hour' && value > 24) {
      this.customClock.hour = this.currentClock.hour;
    }
    if (inputName == 'minute' && value > 59) {
      this.customClock.minute = this.currentClock.minute;
    }
    if (inputName == 'second' && value > 59) {
      this.customClock.second = this.currentClock.second;
    }
    this.currentClock = this.setClock(this.customClock.hour, this.customClock.minute, this.customClock.second);

  }

  ngOnDestroy() {
    this.clockInterval && clearInterval(this.clockInterval);
  }
}
