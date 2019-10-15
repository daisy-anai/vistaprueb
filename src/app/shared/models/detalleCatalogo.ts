import { TipoCatalogo } from './tipoCatalogo';
import { Modalidad } from './modalidad';
import { Seccion } from './seccion';
import { Propiedad } from './propiedad';

export class DetalleCatalogo{
  id: number;
  nombre: String;
  tipoCatalogo: TipoCatalogo;
  modalidad: Modalidad;  
  seccion: Array<Seccion>;
  propiedad: Array<Propiedad>;

  constructor(
    id?: number,
    nombre?: String,
    tipoCatalogo?: TipoCatalogo,
    modalidad?: Modalidad,  
    seccion?: Array<Seccion>,
    propiedad?: Array<Propiedad>
  ) {}

}
