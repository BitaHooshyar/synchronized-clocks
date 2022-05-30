import { Component, OnDestroy, OnInit } from '@angular/core';
import { TwoDigitPipe } from './pipes/two-digit.pipe';

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
  public title: string = 'Synchronized Clocks';

  public currentDate: Date = new Date();

  public clockIsAuto: boolean = true;

  public currentClock: ClockInfo = {
    hour: 0,
    minute: 0,
    second: 0,
    period: 'AM',
    hourHandStyle: { transform: `none` },
    minuteHandStyle: { transform: `none` },
    secondHandStyle: { transform: `none` }
  };
  public customClock: ClockInfo = {
    hour: 0,
    minute: 0,
    second: 0,
    period: 'AM',
    hourHandStyle: { transform: `none` },
    minuteHandStyle: { transform: `none` },
    secondHandStyle: { transform: `none` },
  };

  private clockInterval: any;

  constructor() {}

  ngOnInit() {
    if (this.clockIsAuto) {
      this.intervalClock();
    } else {
      this.customClock = this.currentClock;
    }
  }

  intervalClock() {
    let date = new Date();
    this.clockInterval = setInterval(() => {
      date = new Date();
      this.currentClock = this.initialClock(date);
    }, 1000);
  }

  initialClock(date: Date): ClockInfo {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return {
      hour: hour,
      minute: minute,
      second: second,
      period: hour < 12 ? 'AM' : 'PM',
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

  ngOnDestroy() {
    this.clockInterval && clearInterval(this.clockInterval);
  }
}
