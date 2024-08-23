import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'durationTime',
  standalone: true
})
export class DurationTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if (!value) return '0:00';

    const seconds = Math.floor(value % 60);
    const minutes = Math.floor(value / 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

}
