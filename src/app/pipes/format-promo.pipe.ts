import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPromo',
  standalone: true
})
export class FormatPromoPipe implements PipeTransform {

  transform([price, discount]: [string, string]) {
    return (parseFloat(price) - parseFloat(discount)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}
