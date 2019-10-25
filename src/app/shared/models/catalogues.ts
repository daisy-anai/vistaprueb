import { CatalogueType }from  './catalogueType';

export interface Catalogues{
	id: number;
	id_modalidad: String;
	catalogueType:CatalogueType;
	name: String;
	configuration: string;
	created_at: Date;
	deprecated: Boolean;
 }