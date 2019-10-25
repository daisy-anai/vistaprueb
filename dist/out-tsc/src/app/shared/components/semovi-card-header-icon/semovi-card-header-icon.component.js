import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let SemoviCardHeaderIconComponent = class SemoviCardHeaderIconComponent {
    constructor(navigate, route) {
        this.navigate = navigate;
        this.route = route;
    }
    redirect() {
        if (!this.urn) {
            this.navigate.back();
        }
        else {
            this.route.navigate([this.urn]);
        }
    }
};
tslib_1.__decorate([
    Input()
], SemoviCardHeaderIconComponent.prototype, "urn", void 0);
tslib_1.__decorate([
    Input()
], SemoviCardHeaderIconComponent.prototype, "icon", void 0);
SemoviCardHeaderIconComponent = tslib_1.__decorate([
    Component({
        selector: 'semovi-card-header-icon',
        templateUrl: './semovi-card-header-icon.component.html',
        styleUrls: ['./semovi-card-header-icon.component.css']
    })
], SemoviCardHeaderIconComponent);
export { SemoviCardHeaderIconComponent };
