import { Propiedad } from './propiedad';

export class Seccion {
  id: string;
  nombre: string;
  estatus: Boolean;
  create: Date;
  propiedad: Propiedad;
  
  constructor(
    id?: string,
    nombre?:string,
    estatus?: boolean,
    modalidad?: Date,  
    propiedad?: Array<Propiedad>
  ) {}

}
