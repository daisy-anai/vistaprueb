import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let SemoviCardHeaderOptionComponent = class SemoviCardHeaderOptionComponent {
    constructor() { }
    ngOnInit() {
        var elems = document.querySelectorAll('.dropdown-header-options');
        var instances = M.Dropdown.init(elems, {
            alignment: 'left',
            constrainWidth: false,
            coverTrigger: true
        });
    }
};
tslib_1.__decorate([
    Input()
], SemoviCardHeaderOptionComponent.prototype, "options", void 0);
SemoviCardHeaderOptionComponent = tslib_1.__decorate([
    Component({
        selector: 'semovi-card-header-option',
        templateUrl: './semovi-card-header-option.component.html',
        styleUrls: ['./semovi-card-header-option.component.css']
    })
], SemoviCardHeaderOptionComponent);
export { SemoviCardHeaderOptionComponent };
