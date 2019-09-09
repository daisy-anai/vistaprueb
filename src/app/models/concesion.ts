import { Modalidad } from './modalidad';
import { Sitio } from './sitio';
import { Concesionario } from './concesionario';

export class Concesion {
  public id: String;
  public acuerdo: String;
  public fechaAcuerdo: Date;
  public fechaVencimiento: Date;
  public fechaCaptura: Date;
  public vigencia: String;
  public observaciones: String;
  public observacionesActa: String;
  public ruta: String;
  public fechaInicio: Date;
  public unidadesAmparadas: Number;
  public modalidad: Modalidad;
  public sitio: Sitio;
  public nuc: String;
  public estatus: Boolean;
  public concesionario: Concesionario;
  public condiciones: any;

  constructor() {

  }
}
