import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { slideAnimation } from '../transition';
let SemoviRouterOutletComponent = class SemoviRouterOutletComponent {
    constructor() { }
    ngOnInit() {
    }
};
SemoviRouterOutletComponent = tslib_1.__decorate([
    Component({
        selector: 'semovi-router-outlet',
        templateUrl: './semovi-router-outlet.component.html',
        styleUrls: ['./semovi-router-outlet.component.css'],
        animations: [
            slideAnimation
        ]
    })
], SemoviRouterOutletComponent);
export { SemoviRouterOutletComponent };
