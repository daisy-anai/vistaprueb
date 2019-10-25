import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let BuscarConcesionComponent = class BuscarConcesionComponent {
    constructor(service, shared, router) {
        this.service = service;
        this.shared = shared;
        this.router = router;
        this.loading = false;
        this.tipo = 1;
        this.filtro = 'candido gallegos';
    }
    cambiarModo(tipo) {
        this.filtro = "";
        this.tipo = tipo;
        this.concesiones = null;
        document.getElementById('filtro').focus();
    }
    buscar(event) {
        if (!this.filtro) {
            this.concesiones = null;
        }
        else {
            this.loading = true;
            this.service.getConcesiones(this.filtro.trim(), this.tipo, 1).subscribe(result => {
                this.concesiones = result.data['concesiones'];
                this.loading = false;
            });
        }
    }
    permitido(concesion) {
        let errores = [];
        let status = true;
        if (concesion.condiciones.bloqueado) {
            errores.push("Concesión bloqueada");
            status = false;
        }
        if (!concesion.condiciones.vigente) {
            errores.push("Concesión vencida");
            status = false;
        }
        if (!concesion.modalidad.estatus) {
            errores.push("Modalidad invalida o inactiva");
            status = false;
        }
        if (concesion.nuc.status == "/") {
            errores.push("No cuenta con NUC");
            status = false;
        }
        return status;
    }
    redirect(concesion) {
        if (this.permitido(concesion)) {
            this.shared.setConcesion(concesion);
            this.router.navigate(['/aplicacion/vehiculo/busqueda']);
        }
    }
};
BuscarConcesionComponent = tslib_1.__decorate([
    Component({
        selector: 'buscar-concesion',
        templateUrl: './buscar-concesion.component.html',
        styleUrls: ['./buscar-concesion.component.css']
    })
], BuscarConcesionComponent);
export { BuscarConcesionComponent };
