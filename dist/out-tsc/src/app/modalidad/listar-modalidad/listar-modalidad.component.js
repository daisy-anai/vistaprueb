import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListarModalidadComponent = class ListarModalidadComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.service.getModalidades().subscribe(({ data }) => {
            this.modalidades = data['modalidades'];
        });
    }
};
ListarModalidadComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listar-modalidad',
        templateUrl: './listar-modalidad.component.html',
        styleUrls: ['./listar-modalidad.component.css']
    })
], ListarModalidadComponent);
export { ListarModalidadComponent };
