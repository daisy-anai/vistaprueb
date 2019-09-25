import { TipoCatalogo } from './tipoCatalogo';
import { Modalidad } from './modalidad';
import { Seccion } from './seccion';
import { Propiedad } from './propiedad';

export class DetalleCatalogo{
  id: number;
  nombre: String;
  tipoCatalogo: TipoCatalogo;
  modalidad: Modalidad;  
  seccion: Seccion;
  propiedad: Propiedad;

  constructor(
    id?: number,
    nombre?: String,
    tipoCatalogo?: TipoCatalogo,
    modalidad?: Modalidad,  
    seccion?: Seccion,
    propiedad?: Propiedad
  ) {}

}
