import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DetalleCatalogoComponent = class DetalleCatalogoComponent {
    constructor(router, route, service) {
        this.router = router;
        this.route = route;
        this.service = service;
        this.visible = false;
    }
    ngOnInit() {
        let deprecated = this.route.snapshot.paramMap.get("deprecated");
        if (deprecated == "true") {
            this.visible = false;
            this.catalgueData();
        }
        else {
            this.visible = true;
            this.catalgueData();
        }
    }
    catalogueDeprecate(id) {
        this.service.catalogueDeprecate(id, "hola").subscribe(result => {
            this.router.navigate(['/aplicacion/catalogo/listar']);
        });
    }
    catalgueData() {
        this.service.catalogueByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(({ data }) => {
            this.catalogo = data['catalogue'];
        });
    }
};
DetalleCatalogoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-detalle-catalogo',
        templateUrl: './detalle-catalogo.component.html',
        styleUrls: ['./detalle-catalogo.component.css']
    })
], DetalleCatalogoComponent);
export { DetalleCatalogoComponent };
