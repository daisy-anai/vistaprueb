import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
let VigenciasService = class VigenciasService {
    constructor(apollo) {
        this.apollo = apollo;
    }
    createVigencia(id_modalidad, legal_years, extension_years) {
        return this.apollo.use('backrevista').mutate({
            mutation: gql `
      mutation valityVigencia($id_modalidad:ID!,$legal_years:Int!, $extension_years:Int!){
        validity(id_modalidad:$id_modalidad,legal_years:$legal_years,extension_years:$extension_years){
        id
        id_modalidad  
        legal_years
        extension_years
        created_at
        deprecated
        }
      }`,
            variables: {
                id_modalidad: id_modalidad,
                legal_years: legal_years,
                extension_years: extension_years
            }
        });
    }
    getVigencias() {
        return this.apollo.use('backrevista').watchQuery({
            query: gql `
      query validities{
        validities{
          id
          id_modalidad
          legal_years
          extension_years
          created_at
          deprecated
        }
      }`,
        }).valueChanges;
    }
    getVigenciasModalidadByID(id_modalidad) {
        return this.apollo.use('backrevista').watchQuery({
            query: gql `
      query validities($id_modalidad:ID!){
        validityByModalidad(id_modalidad:$id_modalidad){
          id
          id_modalidad
          legal_years
          extension_years
          created_at
          deprecated
        }
      }`,
            variables: {
                id_modalidad: id_modalidad
            }
        }).valueChanges;
    }
    vigenciasByID(id) {
        return this.apollo.use('backrevista').watchQuery({
            query: gql ` 
      query validities($id:ID!){
        validity(id:$id){
          id
          id_modalidad
          legal_years
          extension_years
          created_at
          deprecated
        }
      }`,
            variables: {
                id: id
            }
        }).valueChanges;
    }
    updateVigencias(id, id_modalidad, legal_years, extension_years) {
        return this.apollo.use('backrevista').mutate({
            mutation: gql `
      mutation validityUpdate($id:ID!,$id_modalidad:ID!,$legal_years:Int!,$extension_years:Int!){
        validityUpdate(id:$id,id_modalidad:$id_modalidad,legal_years:$legal_years,extension_years:$extension_years){
          id
          id_modalidad
          legal_years
          extension_years
          created_at
          deprecated
        }
      }`,
            variables: {
                id: id,
                id_modalidad: id_modalidad,
                legal_years: legal_years,
                extension_years: extension_years
            }
        });
    }
};
VigenciasService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], VigenciasService);
export { VigenciasService };
