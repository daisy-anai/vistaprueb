import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let BuscarVehiculoComponent = class BuscarVehiculoComponent {
    constructor(service, shared, router) {
        this.service = service;
        this.shared = shared;
        this.router = router;
        this.out = new EventEmitter();
        this.loading = false;
        this.filtro = 'KMHAG51G44U340853';
    }
    ngOnInit() {
        this.concesion = this.shared.getConcesion();
        if (!this.concesion) {
            this.router.navigate(['/aplicacion/concesion/busqueda']);
        }
    }
    onKeyDown($event) {
        this.buscar();
    }
    buscar() {
        this.loading = true;
        this.service.getVehiculo(this.concesion.id, this.filtro).subscribe(result => {
            this.vehiculo = result.data['vehiculoActivo'];
            this.loading = false;
        }, (error) => {
            var errores = error.message.split(":");
            var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;' + errores[1] + '</div></span>';
            M.toast({ html: toastHTML });
            this.loading = false;
        });
    }
    permitido(vehiculo) {
        console.log(vehiculo);
        let errores = [];
        let status = true;
        if (vehiculo.estatus != 'A') {
            errores.push('Vehiculo bloqueado');
            status = false;
        }
        return status;
    }
    redirect(vehiculo) {
        if (this.permitido(vehiculo)) {
            this.out.emit(vehiculo);
            this.shared.setVehiculo(vehiculo);
            // this.router.navigate([''])
        }
    }
    goToSearchConcesion() {
        this.router.navigate(['/aplicacion/inicio']);
    }
    vigenciaVehiculo() {
    }
};
tslib_1.__decorate([
    Input()
], BuscarVehiculoComponent.prototype, "in", void 0);
tslib_1.__decorate([
    Output()
], BuscarVehiculoComponent.prototype, "out", void 0);
BuscarVehiculoComponent = tslib_1.__decorate([
    Component({
        selector: 'buscar-vehiculo',
        templateUrl: './buscar-vehiculo.component.html',
        styleUrls: ['./buscar-vehiculo.component.css']
    })
], BuscarVehiculoComponent);
export { BuscarVehiculoComponent };
