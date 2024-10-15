import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  standalone: true
})
export class FormatPricePipe implements PipeTransform {

  transform(price:string): string {
    return parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;
  }

}
