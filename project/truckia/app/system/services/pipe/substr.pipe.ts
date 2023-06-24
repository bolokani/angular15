import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substr'
})
export class SubstrPipe implements PipeTransform {

  transform(value: string, from: number, length: number): any {
    var x;
    if (value) {
      x = value.substr(from, length);
      if (x.length >= length) {
        x += "..."
      }
    }
    else {

    }
    return x;

  }

}