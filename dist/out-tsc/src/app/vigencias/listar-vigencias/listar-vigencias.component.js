import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListarVigenciasComponent = class ListarVigenciasComponent {
    constructor(service, serviceCatalogo, route) {
        this.service = service;
        this.serviceCatalogo = serviceCatalogo;
        this.route = route;
        this.buscarVisible = false;
        this.agregarVisible = false;
        this.vigenciaVisible = false;
    }
    ngOnInit() {
        if (this.route.snapshot.paramMap.get("id")) {
            this.service.getVigenciasModalidadByID(this.route.snapshot.paramMap.get("id")).subscribe(({ data }) => {
                this.vigencias = data['validityByModalidad'];
            });
        }
        else {
            this.agregarVisible = true;
            this.buscarVisible = true;
            this.vigenciaVisible = true;
            this.service.getVigencias().subscribe(({ data }) => {
                this.vigencias = data['validities'];
            });
        }
    }
    activeValidities() {
        console.log("activas");
    }
    allValidities() {
        this.service.getVigencias().subscribe(({ data }) => {
            this.vigencias = data['validities'];
        });
    }
};
ListarVigenciasComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listar-vigencias',
        templateUrl: './listar-vigencias.component.html',
        styleUrls: ['./listar-vigencias.component.css']
    })
], ListarVigenciasComponent);
export { ListarVigenciasComponent };
