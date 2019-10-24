import { Default } from './default';

export interface Vigencia extends Default { 
  
  id: Number;
  id_modalidad: String;
  legal_years: Number;
  extension_years: Number;
  created_at: Date; 
  deprecated: Boolean
  
}
