import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
// Pipes
import { SearchPipe } from './search.pipe';
let FiltersModule = class FiltersModule {
};
FiltersModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            SearchPipe
        ],
        imports: [],
        exports: [
            SearchPipe
        ]
    })
], FiltersModule);
export { FiltersModule };
