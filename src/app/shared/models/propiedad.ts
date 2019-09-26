import { TipoPropiedad } from './tipoPropiedad';

export interface Propiedad {
  id: string;
  nombre: string;
  estatus: Boolean;
  create: Date;
  tipoPropiedad: TipoPropiedad;
}
