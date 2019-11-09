import { CatalogueType }from  './catalogueType';

export interface Catalogues{
	id: string;
	id_modalidad: String;
	catalogueType:CatalogueType;
	name: String;
	configuration: string;
	created_at: Date;
	deprecated: Boolean;
 }