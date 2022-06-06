import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ClockDigitFormat } from './pipes/clock-digit-format.pipe';

describe('AppComponent', () => {

  let component = new AppComponent();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ClockDigitFormat
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  });

  let mocCurrentClock = {
    hour: 0,
    minute: 0,
    second: 0,
    period: 'AM',
    hourHandStyle: { transform: `rotate(90deg)` },
    minuteHandStyle: { transform: `rotate(90deg)` },
    secondHandStyle: { transform: `rotate(90deg)` }
  };

  let mockCustomClock = {
    hour: 1,
    minute: 1,
    second: 1,
    period: 'AM',
    hourHandStyle: { transform: 'rotate(120.5deg)' },
    minuteHandStyle: { transform: 'rotate(96.1deg)' },
    secondHandStyle: { transform: 'rotate(96deg)' }
  };

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Synchronized clocks'`, () => {
    expect(component.title).toEqual('Synchronized clocks');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content--center h1')?.textContent).toContain('Synchronized clocks');
  });

  describe('ngOnInit', () => {

    it('Should run `intervalClock`, If it is True', () => {
      spyOn(component, 'intervalClock');
      component.clockIsAuto = true;
      component.ngOnInit();
      expect(component.intervalClock).toHaveBeenCalled();
    });

    it('`customClock` Should be equal to `currentClock` AND Should not run `intervalClock`, If it is False', () => {
      spyOn(component, 'intervalClock');
      component.clockIsAuto = false;
      component.ngOnInit();
      expect(component.customClock).toEqual(component.currentClock);
      expect(component.intervalClock).not.toHaveBeenCalled();
    });
  });

  describe('changeClockState', () => {

    it('Should change `clockIsAuto` to False and Should not run `intervalClock`, If it is True', () => {
      spyOn(component, 'intervalClock');
      component.clockIsAuto = true;
      component.changeClockState();
      expect(component.clockIsAuto).toBeFalse();
      expect(component.intervalClock).not.toHaveBeenCalled();
      expect(component.clockInterval).toBeDefined;
    });

    it('Should change `clockIsAuto` to True AND `customClock` Should be equal to `currentClock` AND Should run `intervalClock` AND Should clear `clockInterval`, If it is False', () => {
      spyOn(component, 'intervalClock');
      component.clockIsAuto = false;
      component.clockInterval = 2;
      component.changeClockState();
      expect(component.clockIsAuto).toBeTrue();
      expect(component.customClock).toEqual(component.currentClock);
      expect(component.intervalClock).toHaveBeenCalled();
      expect(component.clockInterval).not.toBeDefined;
    });
  });

  describe('setClock', () => {

    it('Should set clock', () => {
      component.setClock(1, 1, 1);
      expect(component.setClock(1, 1, 1)).toEqual({
        hour: 1,
        minute: 1,
        second: 1,
        period: 'AM',
        hourHandStyle: { transform: 'rotate(120.5deg)' },
        minuteHandStyle: { transform: 'rotate(96.1deg)' },
        secondHandStyle: { transform: 'rotate(96deg)' }
      });
    });

    it('Should set clock when hour is equal to null', () => {
      component.setClock(null, 1, 1);
      expect(component.setClock(null, 1, 1)).toEqual({
        hour: 12,
        minute: 1,
        second: 1,
        period: 'AM',
        hourHandStyle: { transform: 'rotate(90.5deg)' },
        minuteHandStyle: { transform: 'rotate(96.1deg)' },
        secondHandStyle: { transform: 'rotate(96deg)' }
      });
    });

    it('Should set clock when minute is equal to null', () => {
      component.setClock(1, null, 1);
      expect(component.setClock(1, null, 1)).toEqual({
        hour: 1,
        minute: 0,
        second: 1,
        period: 'AM',
        hourHandStyle: { transform: 'rotate(120deg)' },
        minuteHandStyle: { transform: 'rotate(90.1deg)' },
        secondHandStyle: { transform: 'rotate(96deg)' }
      });
    });

    it('Should set clock when second is equal to null', () => {
      component.setClock(1, 1, null);
      expect(component.setClock(1, 1, null)).toEqual({
        hour: 1,
        minute: 1,
        second: 0,
        period: 'AM',
        hourHandStyle: { transform: 'rotate(120.5deg)' },
        minuteHandStyle: { transform: 'rotate(96deg)' },
        secondHandStyle: { transform: 'rotate(90deg)' }
      });
    });
  });

  describe('updateClock', () => {
    it('Should update clock', () => {
      component.customClock = {
        hour: 1,
        minute: 1,
        second: 1,
        period: 'AM',
        hourHandStyle: { transform: 'rotate(120.5deg)' },
        minuteHandStyle: { transform: 'rotate(96.1deg)' },
        secondHandStyle: { transform: 'rotate(96deg)' }
      };
      const mockEvent = { target: { value: '1' } };
      component.updateClock('hour', mockEvent);
      expect(component.currentClock).toEqual({
        hour: 1,
        minute: 1,
        second: 1,
        period: 'AM',
        hourHandStyle: { transform: 'rotate(120.5deg)' },
        minuteHandStyle: { transform: 'rotate(96.1deg)' },
        secondHandStyle: { transform: 'rotate(96deg)' }
      });
    });
  });
});
