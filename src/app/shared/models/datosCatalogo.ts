import { TipoCatalogo } from './tipoCatalogo';
import { Modalidad } from './modalidad';
import { Seccion } from './seccion';

export interface DatosCatalogo{

  id: number;
  nombre: String;
  tipoCatalogo: TipoCatalogo;
  modalidad: Modalidad;  
  seccion: Array<Seccion>

}
