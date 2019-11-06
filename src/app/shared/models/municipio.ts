import { Distrito } from './distrito';
import { Region } from './region';

export interface Municipio{
  id : string;
  nombre: string;
  distrito: Distrito;
 region: Region;
}