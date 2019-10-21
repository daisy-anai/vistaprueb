import { CatalogueType }from  './catalogueType';

export interface Catalogues{
	id: number;
	id_modalidad: String;
	catalogueType:CatalogueType;
	name: String;
	configuration: String;
	created_at: Date;
	deprecated: Boolean;
 }