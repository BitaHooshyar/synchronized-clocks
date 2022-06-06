import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clockDigitFormat'
})
export class ClockDigitFormat implements PipeTransform {

  transform(value: number): string {
    return (value + '').length === 1 ? '0' + value : value + '';
  }
}
