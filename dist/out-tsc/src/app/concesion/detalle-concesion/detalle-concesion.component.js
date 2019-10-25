import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DetalleConcesionComponent = class DetalleConcesionComponent {
    constructor(shared, router) {
        this.shared = shared;
        this.router = router;
    }
    ngOnInit() {
        this.concesion = this.shared.getConcesion();
        if (!this.concesion) {
            this.router.navigate(['/aplicacion/concesion/busqueda']);
        }
    }
};
DetalleConcesionComponent = tslib_1.__decorate([
    Component({
        selector: 'detalle-concesion',
        templateUrl: './detalle-concesion.component.html',
        styleUrls: ['./detalle-concesion.component.css']
    })
], DetalleConcesionComponent);
export { DetalleConcesionComponent };
