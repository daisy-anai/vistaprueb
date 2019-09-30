import { Seccion} from '../models/seccion'; 
import { Injectable } from "@angular/core";
import gql from "graphql-tag";
import * as Apollo from "apollo-angular";

export type Maybe <T> = T| null;
export namespace crearCatalogo{
  export type Variables={
    secciones: Array<Seccion>;
  };

  export type Mutation = {
    __typename?: "Mutation";
    crearCatalogo: Maybe<crearCatalogo>;
  };

  export type crearCatalogo = {
    __typename?: "newCatalogo";
    secciones: Maybe<Array<Seccion>>;
  };
}
  @Injectable({
    providedIn: "root"
  })
  //mutation para crear catalogo
  export class crearteCatalogo  extends Apollo.Mutation<
    crearCatalogo.Mutation,
    crearCatalogo.Variables
  >{ 
    document: any =gql`

    `;
  }