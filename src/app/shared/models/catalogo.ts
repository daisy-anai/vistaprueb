import { Default } from './default';
import { TipoCatalogo } from './tipoCatalogo';
import { Modalidad } from './modalidad';
import { Seccion } from './seccion';

export interface Catalogo extends Default {
  nombre: String; 
  tipoCatalogo: TipoCatalogo;
  modalidad: Modalidad;
  secciones: Array<Seccion>;
}
