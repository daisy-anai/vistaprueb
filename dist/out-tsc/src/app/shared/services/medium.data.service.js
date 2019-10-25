import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
let MediumDataService = class MediumDataService {
    constructor() {
    }
    setConcesion(concesion) {
        this.concesion = concesion;
    }
    getConcesion() {
        return this.concesion;
    }
    setVehiculo(vehiculo) {
        this.vehiculo = vehiculo;
    }
    getVehiculo() {
        return this.vehiculo;
    }
    deleteConcesion() {
        this.concesion = null;
    }
};
MediumDataService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], MediumDataService);
export { MediumDataService };
