import { Pipe, PipeTransform } from '@angular/core';

export type FormatOptions = 'dd/mm/yyyy' | 'dd/mm' | 'long';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date, config: FormatOptions): string {
    let formatedDate: string;

    switch (config) {
      case 'dd/mm/yyyy':
        formatedDate = date.toLocaleDateString('pt-BR');
        break;
      case 'dd/mm':
        formatedDate = date.toLocaleDateString('pt-BR').substr(0, 5);
        break;
    }

    return formatedDate;
  }
}
