import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let CrearVigenciasComponent = class CrearVigenciasComponent {
    constructor(service, formBuilder, serviceCatalogo, router) {
        this.service = service;
        this.formBuilder = formBuilder;
        this.serviceCatalogo = serviceCatalogo;
        this.router = router;
    }
    ngOnInit() {
        this.serviceCatalogo.getModalidades().subscribe(result => {
            this.modalidades = result.data['modalidades'];
        });
        this.catalogoForm = this.formBuilder.group({
            id_modalidad: ['', Validators.required],
            anios_legales: [1, [Validators.required, Validators.min(1)]],
            anios_prorroga: [0, [Validators.required, Validators.min(0)]]
        });
    }
    /**
      @description Crear Vigencia Mutation
      @param crearVigencia
    */
    crearVigencia() {
        console.log(this.catalogoForm.value);
        const id_modalidad = this.catalogoForm.value.id_modalidad;
        const legal_years = this.catalogoForm.value.anios_legales;
        const extension_years = this.catalogoForm.value.anios_prorroga;
        this.service.createVigencia(id_modalidad, legal_years, extension_years).subscribe((result) => {
            this.router.navigate(['aplicacion/vigencias/']);
        }, (error) => {
            console.log(error);
        });
    }
};
CrearVigenciasComponent = tslib_1.__decorate([
    Component({
        selector: 'app-crear-vigencias',
        templateUrl: './crear-vigencias.component.html',
        styleUrls: ['./crear-vigencias.component.css']
    })
], CrearVigenciasComponent);
export { CrearVigenciasComponent };
