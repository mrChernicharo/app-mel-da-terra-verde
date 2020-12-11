import { Pipe, PipeTransform } from '@angular/core';

export interface IServerTimestamp {
  seconds: number;
  nanoseconds: number;
}

@Pipe({
  name: 'serverTimestamp',
})
export class ServerTimestampPipe implements PipeTransform {
  transform(timestamp: IServerTimestamp, ...args: unknown[]): Date {
    const date = new Date(timestamp.seconds * 1000);

    return date;
  }
}
