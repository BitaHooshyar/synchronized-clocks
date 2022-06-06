import { ClockDigitFormat } from './clock-digit-format.pipe';

describe('ClockDigitFormat', () => {

  const pipe = new ClockDigitFormat();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms 1 to `01`', () => {
    expect(pipe.transform(1)).toBe('01');
  });

  it('transforms 10 to `10`', () => {
    expect(pipe.transform(10)).toBe('10');
  });
});
