export class TipoPropiedad {
  id: string;
  nombre: string;
  estatus: Boolean;
  create: Date;

  constructor(
    id?: number,
    nombre?: String,
    estatus?: boolean,
    create?:Date
  ) {}
}
