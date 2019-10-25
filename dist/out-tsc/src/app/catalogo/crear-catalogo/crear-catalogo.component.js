import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
let CrearCatalogoComponent = class CrearCatalogoComponent {
    constructor(service, formBuilder, router, route) {
        this.service = service;
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
    }
    ngOnInit() {
        let id_modalidad = this.route.snapshot.paramMap.get("id");
        this.service.getCatalogues().subscribe(({ data }) => {
            this.catalogues = data['catalogues'];
        });
        this.service.getCatalogoType().subscribe(result => {
            this.catalogoTypes = result.data['catalogueTypes'];
        });
        this.service.getModalidad(id_modalidad).subscribe(({ data }) => {
            this.modalidad = data['modalidad'];
            console.log(this.modalidad);
        });
        this.catalogueForm = this.formBuilder.group({
            id_modalidad: [id_modalidad, Validators.required],
            name_catalogue: ['', Validators.required],
            id_catalogue: ['', Validators.required],
            seccion: new FormArray([], Validators.required)
            // configuration: this.formBuilder.array([]),
        });
    }
    createCatalogue() {
        console.log(this.catalogueForm);
        let id_modalidad = this.catalogueForm.value.id_modalidad;
        let id_catalogue = this.catalogueForm.value.name_catalogue;
        let name = this.catalogueForm.value.name;
        let configuration = this.catalogueForm.value.configuration;
        // this.service.createdCatalogue(id_modalidad,id_catalogue,name,configuration).subscribe(({ data })=>{
        //   this.catalogues = data['catalogue'];
        // }); 
    }
    addSeccion() {
        let seccion = this.catalogueForm.controls.seccion;
        seccion.push(this.formBuilder.group({
            seccionName: ['', Validators.required],
            propiedad: new FormArray([], Validators.required)
        }));
    }
    propiedadesForm() {
        let controles = this.configurarcionForm;
        let propiedades = controles.propiedad;
        let properties = this.catalogueForm.controls;
    }
    addPropiedad() {
    }
};
CrearCatalogoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-crear-catalogo',
        templateUrl: './crear-catalogo.component.html',
        styleUrls: ['./crear-catalogo.component.css'],
    })
], CrearCatalogoComponent);
export { CrearCatalogoComponent };
