import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AplicacionComponent = class AplicacionComponent {
    constructor(router, session) {
        this.router = router;
        this.session = session;
    }
    ngOnInit() {
        this.user = this.session.getCurrentUser();
        var elems = document.querySelectorAll('.dropdown-menu');
        var instances = M.Dropdown.init(elems, {
            alignment: 'left',
            constrainWidth: true,
            coverTrigger: false,
            closeOnClick: true
        });
        $('.sidenav').sidenav({
            closeOnClick: false,
            draggable: true
        });
    }
    logout() {
        this.session.logout();
        this.router.navigate(['/login']);
    }
};
AplicacionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-aplicacion',
        templateUrl: './aplicacion.component.html',
        styleUrls: ['./aplicacion.component.css']
    })
], AplicacionComponent);
export { AplicacionComponent };
