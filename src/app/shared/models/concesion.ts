import { Modalidad } from './modalidad';
import { Sitio } from './sitio';
import { Concesionario } from './concesionario';

export interface Concesion {
  id: String;
  acuerdo: String;
  fechaAcuerdo: Date;
  fechaVencimiento: Date;
  fechaCaptura: Date;
  vigencia: String;
  observaciones: String;
  observacionesActa: String;
  ruta: String;
  fechaInicio: Date;
  unidadesAmparadas: Number;
  modalidad: Modalidad;
  sitio: Sitio;
  nuc: String;
  estatus: Boolean;
  concesionario: Concesionario;
  condiciones: any;
}
