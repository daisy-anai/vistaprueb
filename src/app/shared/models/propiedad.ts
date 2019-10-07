import { Default } from './default';
import { TipoPropiedad } from './tipoPropiedad';

export interface Propiedad extends Default {
  nombre: string;
  tipoPropiedad: TipoPropiedad;
}
