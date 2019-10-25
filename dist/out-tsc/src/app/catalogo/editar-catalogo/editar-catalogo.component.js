import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let EditarCatalogoComponent = class EditarCatalogoComponent {
    constructor(route, service, formBuilder, navigate) {
        this.route = route;
        this.service = service;
        this.formBuilder = formBuilder;
        this.navigate = navigate;
    }
    ngOnInit() {
        this.service.getModalidades().subscribe(result => {
            this.modalidades = result.data['modalidades'];
        });
        this.catalogueForm = this.formBuilder.group({
            modality: ['', Validators.required],
            name_catalogue: ['', Validators.required],
            id_catalogue: ['', Validators.required],
            configuration: ['', Validators.required]
        });
    }
};
EditarCatalogoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editar-catalogo',
        templateUrl: './editar-catalogo.component.html',
        styleUrls: ['./editar-catalogo.component.css']
    })
], EditarCatalogoComponent);
export { EditarCatalogoComponent };
