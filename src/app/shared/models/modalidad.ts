import { Vigencia } from './vigencia';

export interface Modalidad {
  id: String;
  nombre: String;
  descripcion: String; 
  abreviatura: String;
  vigencia: Vigencia;
}
