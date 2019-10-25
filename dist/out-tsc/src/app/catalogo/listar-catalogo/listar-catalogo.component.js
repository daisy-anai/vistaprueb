import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListarCatalogoComponent = class ListarCatalogoComponent {
    constructor(service, vigenciasService, route) {
        this.service = service;
        this.vigenciasService = vigenciasService;
        this.route = route;
    }
    ngOnInit() {
        this.modalidadID = this.route.snapshot.paramMap.get("id");
        this.options = [
            { icon: 'add', description: 'Generar catálogo', urn: `/aplicacion/catalogo/crear/${this.modalidadID}` },
            { icon: 'list', description: 'Vigencia', urn: `/aplicacion/vigencias/modalidad/${this.modalidadID}` }
        ];
        // if(this.modalidadID){
        //   this.service.catalogueByModality(this.modalidadID).subscribe(({ data })=>{
        //     this.catalogos = data['catalogueByModalidad']; 
        //     console.log(this.catalogos);
        //     for (const catalogo of this.catalogos) {
        //       if(catalogo.deprecated==false ){
        //        console.log(catalogo.id_modalidad);
        //         this.service.getCatalogues().subscribe(({ data })=>{
        //          this.catalogos = data['catalogues'];
        //          console.log(this.catalogos );
        //         })
        //       }
        //     }  
        //   });
        // }else {
        // }
        if (this.modalidadID) {
            this.service.catalogueByModality(this.modalidadID).subscribe(({ data }) => {
                this.catalogos = data['catalogueByModalidad'];
                console.log(this.catalogos);
            });
        }
        else {
            this.service.getCatalogues().subscribe(({ data }) => {
                this.catalogos = data['catalogues'];
            });
        }
    }
    searchCatalgue(event) {
        if (!this.filtro) {
            this.service.catalogueByModality(this.modalidadID).subscribe(({ data }) => {
                this.catalogos = data['catalogueByModalidad'];
            });
        }
        else {
            this.service.searchWord(2, this.filtro.trim()).subscribe(({ data }) => {
                this.catalogos = data['cataloguesLike'];
            });
        }
    }
    activeCatalogues() {
        this.service.getCatalogues().subscribe(({ data }) => {
            this.catalogos = data['catalogues'];
        });
    }
    allCatalogues() {
        this.service.getCataloguesAll().subscribe(({ data }) => {
            this.catalogos = data['cataloguesAll'];
        });
    }
};
ListarCatalogoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listar-catalogo',
        templateUrl: './listar-catalogo.component.html',
        styleUrls: ['./listar-catalogo.component.css']
    })
], ListarCatalogoComponent);
export { ListarCatalogoComponent };
