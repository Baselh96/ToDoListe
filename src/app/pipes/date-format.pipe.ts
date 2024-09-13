import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  private datePipe: DatePipe = new DatePipe('en-US');

  transform(value: string, format: string = 'dd.MM.YYYY'): string | null {
    if (!value) return null;
    return this.datePipe.transform(value, format);
  }
}
