import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskText',
})
export class MaskTextPipe implements PipeTransform {
  transform(value: string, visibleCount: number = 4): unknown {
    if (!value) {
      return '';
    }
    const maskedLength = value.length - visibleCount;

    const maskedPart = '*'.repeat(maskedLength > 0 ? maskedLength : 0);

    const visiblePart = value.slice(-visibleCount);

    return maskedPart+visiblePart;
  }
}
