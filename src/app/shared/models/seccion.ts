import { Propiedad } from './propiedad';

export  interface Seccion {
  id: string;
  nombre: string;
  estatus: Boolean;
  create: Date;
  propiedad:Array<Propiedad>;

}
