import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let ModificarVigenciasComponent = class ModificarVigenciasComponent {
    constructor(service, catalogoService, formBuilder, route, router) {
        this.service = service;
        this.catalogoService = catalogoService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        this.service.vigenciasByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
            this.vigencia = result.data['validity'];
            this.catalogoService.getModalidad(this.vigencia.id_modalidad).subscribe((result) => {
                this.modalidad = result.data['modalidad'];
                this.modalidad.vigencia = this.vigencia;
                this.vigenciaForm = this.formBuilder.group({
                    id_modalidad: [this.modalidad.id, Validators.required],
                    anios_legales: [this.modalidad.vigencia.legal_years, Validators.required],
                    anios_prorroga: [this.modalidad.vigencia.extension_years, Validators.required]
                });
            });
        });
        this.catalogoService.getModalidades().subscribe(result => {
            this.modalidades = result.data['modalidades'];
        });
    }
    /**
      @description Modificar Vigencia
      @param modificarVigencia
    */
    modificarVigencia() {
        let id = parseInt(this.route.snapshot.paramMap.get("id"));
        let id_modalidad = this.vigenciaForm.value.id_modalidad;
        let legal_years = this.vigenciaForm.value.anios_legales;
        let extension_years = this.vigenciaForm.value.anios_prorroga;
        this.service.updateVigencias(id, id_modalidad, legal_years, extension_years).subscribe(result => {
            this.router.navigate(['/aplicacion/vigencias/listar']);
        });
    }
};
ModificarVigenciasComponent = tslib_1.__decorate([
    Component({
        selector: 'app-modificar-vigencias',
        templateUrl: './modificar-vigencias.component.html',
        styleUrls: ['./modificar-vigencias.component.css']
    })
], ModificarVigenciasComponent);
export { ModificarVigenciasComponent };
