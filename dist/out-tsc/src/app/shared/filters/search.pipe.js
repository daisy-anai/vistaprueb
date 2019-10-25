import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let SearchPipe = class SearchPipe {
    transform(items, filter) {
        if (!items)
            return [];
        if (!filter)
            return items;
        filter = filter.toLowerCase().trim();
        return items.filter(it => {
            return it.name.toLowerCase().includes(filter);
        });
    }
};
SearchPipe = tslib_1.__decorate([
    Pipe({
        name: 'search'
    })
], SearchPipe);
export { SearchPipe };
