import { Rol } from "./rol";

export interface User {
  id: Number
  nombre: String;
  primer_apellido: String;
  segundo_apellido: String;
  correo: String;
  password: String;
  rol: Rol;
  id_centro_trabajo: Number;
  id_region: Number;
}
