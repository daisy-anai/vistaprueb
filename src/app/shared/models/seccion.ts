import { Default } from './default';
import { Propiedad } from './propiedad';

export interface Seccion extends Default{
  nombre: string;
  propiedades: Array<Propiedad>;
}
