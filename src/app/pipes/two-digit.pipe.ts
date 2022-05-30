import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDigit'
})
export class TwoDigitPipe implements PipeTransform {

  transform(value: number | string): string {
    return (value + '').length === 1 ? '0' + value : value + '';
  }

}
