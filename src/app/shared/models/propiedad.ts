import { TipoPropiedad } from './tipoPropiedad';

export class Propiedad {
  id: number;
  nombre: string;
  estatus: Boolean;
  create: Date;
  tipoPropiedad: TipoPropiedad;

  constructor(
    id?: number,
    nombre?: String,
    estatus?: boolean,
    create?:Date,  
    tipoPropiedad?: TipoPropiedad
  ) {}

}
