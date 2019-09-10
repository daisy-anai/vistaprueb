import {Role} from "./role.model";

export class User {
  id: Number
  nombre: String;
  primer_apellido: String;
  segundo_apellido: String;
  correo: String;
  password: String;
  id_rol: Number;
  id_centro_trabajo: Number;
  id_region: Number;
}
