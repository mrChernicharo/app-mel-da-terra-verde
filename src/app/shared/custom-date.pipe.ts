import { Pipe, PipeTransform } from '@angular/core';

export type FormatOptions = 'dd/mm/yyyy' | 'long';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date, config: FormatOptions): string {
    let formatedDate: string;

    switch (config) {
      case 'dd/mm/yyyy':
        formatedDate = `${date.toLocaleDateString()}`;
        break;
    }

    return formatedDate;
  }
}
