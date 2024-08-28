import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'durationTime',
  standalone: true
})
export class DurationTimePipe implements PipeTransform {

  transform(value: number, unit: string = 's'): unknown {
    if (!value) return '0:00';
    const seconds = Math.floor(value % 60);
    let minutes = 0;
    if (unit === 's') minutes = Math.floor(value / 60);
    if (unit === 'ms') minutes = Math.floor(value / 60000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

}
