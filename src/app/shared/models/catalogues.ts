import { CatalogueType }from  './catalogueType';

export interface Catalogues{
	id: string;
	id_modalidad: String;
	id_localidad: string;
	catalogueType:CatalogueType;
	name: String;
	configuration: String;
	created_at: Date;
	deprecated: Boolean;
 }