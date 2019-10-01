import { TipoPropiedad } from './tipoPropiedad';

export interface Propiedad {
  id: number;
  nombre: string;
  estatus: Boolean;
  create: Date;
  tipoPropiedad: TipoPropiedad;

}
