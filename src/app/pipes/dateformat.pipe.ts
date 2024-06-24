import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat',
  standalone: true
})
export class DateformatPipe implements PipeTransform {

  transform(value: string | Date): string {
    if(!value) return "";
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value,'dd/MM/yyyy') || "";
  }

}
