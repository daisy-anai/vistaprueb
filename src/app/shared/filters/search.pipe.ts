import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if(!items) return [];
    if(!filter) return items;

    filter = filter.toLowerCase().trim();
    return items.filter(it => {
      return it.name.toLowerCase().includes(filter);
    })
 }
}
