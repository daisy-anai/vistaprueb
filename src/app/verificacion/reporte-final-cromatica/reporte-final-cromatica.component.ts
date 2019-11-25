import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGEOAXACAWEB } from "../../../assets/imgoaxacagobmx";
import { IMAGE} from "../../../assets/imglogo"; 
import { IMAGE_BANNER } from "../../../assets/banner";

//servicios
import { MediumDataService } from '../../shared/services/medium.data.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'reporte-cromatica',
  templateUrl: './reporte-final-cromatica.component.html',
  styleUrls: ['./reporte-final-cromatica.component.css']
})
export class ReporteFinalCromaticaComponent implements OnInit {
  public concesion : any;
  public vehiculo: any;

  constructor(private shared?: MediumDataService)
   {}

  ngOnInit() {
      this.concesion = this.shared.getConcesion();
      this.vehiculo = this.shared.getVehiculo();

  }
   
  generarpdf(){
    var d= new Date();
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    }
    var  dd = {
     
      pageSize: 'LETTER',
      pageMargins: [ 50, 80, 80, 10 ],
      header:
          { columns:
            [
              { width: 350,text: ''},           
              { image: 'data:image/jpeg;base64,'+IMAGE.IMAGE_B +'\n\n',width: 200,height: 51, margin: [0, 15, 0, 0]}          
            ]
          },
      content: 
            [ { columns:
              [
                { image:  'data:image/jpeg;base64,'+IMAGE_BANNER.IMAGE_BA,width: 612,height: 38,
                absolutePosition: {x:0, y: 78}}
              ]
            },
            { columns:
              [
                {width:300,text:''},
                {width: 300,text:'NUMERO DE FOLIO:'+'DF5154121',fontSize:5,bold:true}
               
              ]
            },
            { columns: 
              [           
               { width: 240, text: 'CONSTANCIA CROMÁTICA \n\n', fontSize: 12,bold: true , margin: [0, 10, 0, 0]},            
              ]
            },
            { columns: 
              [
                { text: 'LUGAR: ',fontSize: 9,bold:true },
                { text: 'FECHA:'+d.getDate()+'\n\n\n',fontSize: 9,bold:true },
              ]
            },
            { columns:
              [
                {alignment: 'justify',text:['De conformidad en lo dispuesto por los artículos 27, fracción VII, 40 fracciones I ,III,VI y XVIII de la Ley Orgánica del Poder Ejecutivo del Estado de Oaxaca; artículos 1, 3, 4, 7, 10, 11, 39 y 40 de la Ley de Procedencia y Justicia Administrativa para el Estado de Oaxaca; artículos 1, 2, 6, 11 fracción I y II, 13 fracciones I, XII y XXX, 28, 35, 102, 103, 107, 108 y 145 de la Ley de Transporte del Estado de Oaxaca; artículos 43 fracción II,IV y VIII, 44 fracción I y II, 63 concepto 21 y 25 del Reglamento de la Ley de Transporte del Estado de Oaxaca; artículo 31 fracción II,IV y VII, 32 fracción I del Reglamento Interno de la Secretaría de Vialidad y Transporte; el acuerdo por el que el Secretario de Vialidad y Transporte del Poder Ejecutivo del Estado de Oaxaca, delega facultades al Titular de la Dirección de Operación del Transporte Público de la misma dependencia, publicado el seis de julio del año dos mil trece en el Periódico Oficial del Gobierno del Estado; y por las instrucciones del Director de Operación del Transporte Público ',{text:'Ing. Felipe Reyna Romero ',bold:true}, 'se dispone lo siguiente: \n\n',], fontSize: 10}
             ]
            },
            { columns:
              [
                {text:'Reunidos en: \n\n',fontSize: 10},
              ]
            },
            { columns:
              [
                {text:'y en atencion al requerimiento de folio: ',fontSize: 10},
                {text:'de fecha:  \n\n',fontSize: 10},
              ]
            },
            { columns:
              [
                {text:'realizado al C. '+this.concesion.concesionario.nombre+' '+this.concesion.concesionario.primerApellido+' '+this.concesion.concesionario.segundoApellido + '    para que presente la unidad de motor con las siguientes características:\n\n', fontSize: 10},
              
              ]
            },
         
            { columns:
              [
                {text:'NUC: ' +this.concesion.nuc,fontSize: 9,bold:true },
                {text:'PLACAS: \n\n',fontSize: 9,bold:true },
              ]
            },
            { columns:
              [
                {text:'NÚMERO DE SERIE: '+this.vehiculo.serie,fontSize: 9,bold:true },
                {text:'MOTOR: '+this.vehiculo.motor+'\n\n',fontSize: 9,bold:true },
              ]
            },{ columns:
              [
                {text:'MARCA: '+this.vehiculo.marca.nombre,fontSize: 9,bold:true },
                {text:'TIPO: ' +this.vehiculo.tipo.nombre +'\n\n',fontSize: 9,bold:true },
              ]
            },
            { columns:
              [
                {text:'MODELO',fontSize: 9,bold:true },
                {text:'COLOR: \n\n',fontSize: 9,bold:true },
              ]
            },
            { columns:
              [
                {alignment: 'justify',text:['- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  SE HACE CONSTAR  - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - -\n\n'],fontSize: 9, bold:true }
              ]
            },
            { columns:
              [
                { alignment:'justify',text:'QUE LA PERSONA YA MENCIONADA SE PRESENTÓ EN LA HORA Y DÍA SEÑALADOS, PRESENTANDO LA UNIDAD YA CON LOS ELEMENTOS COMO LA MARCA LA NORMA TÉCNICA NT-OAX-SEVITRA-01-2015, y no habiendo otro asunto que tratar se da concluida la presente acta siendo las '+d.getHours()+':'+d.getMinutes()+' horas del día de su inicio.',fontSize: 10}
              ]
            },
            { columns:     
              [
                  { width: 180, text: 'ATENTAMENTE                                                                 SUFRAGIO EFECTIVO NO REELECCIÓN                                "EL RESPETO AL DERECHO AJENO ES LA PAZ"\n\n\n\n\n\n', fontSize: 7, margin: [0, 10, 0, 0]},  
              ]
            },
            { columns:
              [
                { text:'__________________________________________________________',fontSize: 7},  
                { text:'__________________________________________________________',fontSize: 7}
              ]
            },
            { columns:
              [
                {text:'ARQ.MARIO HERNÁNDEZ LÓPEZ',fontSize:7,bold:true},
                {text:'INSPECTOR DE CROMÁTICA                      ',fontSize:7,bold:true},
              ]
            }, 
            { columns:
              [
                {text:'JEFE DEL DEPARTAMENTO DE CONTROL DE TRANSPORTE\n\n\n',fontSize:7,bold:true},
                {text:'\n\n\n\n'}
              ]
            },
            {columns:
              [
                { text:'__________________________________________________________',fontSize: 7},  
                { text:'__________________________________________________________',fontSize: 7}  
              ]
            },
            { columns:
              [
                {text:'NOMBRE Y FIRMA DE QUIEN RECIBE LA CONSTANCIA      ',fontSize:7,bold:true},
                {text:'FECHA DE LA NOTIFICACION    \n\n',fontSize:7,bold:true},
              ]
            },
            {
              columns:
              [      
                { alignment: 'justify',text:"En fundamentos en los artículos 68,116 y 120 de la Ley General de Transparencia y Accceso a la información Pública 56,57,58 y 62 de la Ley de Trasparecia y Acceso a la información Pública del Estado de Oaxaca, 16,17,18,19,20 y 21 de la Ley General de Protección de datos Personales en Posesión de Sujetos Obliagados , 9,10,11,12,13 y 14 de la Ley de Protección de Datos personales en Posesión de Sujetos Obligatorios del Estado de Oaxaca, los datos personales contenidos en el presente documento están protegidos, por tanto, solo podran ser usados paralos fines los cuales fueron entregados, cualquier uso deberán ser autorizado por el titular de los mismos, asi mismo por lo previsto en los artículos 1 y 13 de la Ley de Transporte del Estado de Oaxaca, 331 Reglamento interno de la Secretaria de Vialidad y Transporte.\n\n" , fontSize: 4}              ]
            },
            { columns:
              [
                {text:'Ccp. Lic.Mariana Erandy Nassar Piñeyro- Secretaria de Movilidad para su conocimiento                                                                                       Lic. Mario Alberto Guzmán Jaime- subsecretario de regulación y Control de Transporte  Público-Mismo fin                                                        Ing Felipe Reyna Romero -Director de Operación del Transporte Público- Mismp fin                                                                                                 Arq. Marino Hernandez Lopez- Jefe de Departamento de Control de Transporte- Mismo Fin    Expediente *Minotario*',fontSize: 4},
                {text:'Para mayor información consulte la página www.semovi.oaxaca.gob.mx; telefono: atención 0 1( 9 5 1) 5 0 1 6 6 9 1, Ext 1622; o enviar un correo electronico a: controldetransporte@semovioaxaca.gob.mx *OPCIONAL',fontSize: 4}
              ]
            },
            {
              columns:
              [
               { image:  'data:image/jpeg;base64,'+IMAGEOAXACAWEB.IMAGE_W,width: 50,height: 500,absolutePosition: {x: 530, y: 180}}
              ]
            }                   
          ] 
        };
     //Descargar el PDF
     pdfMake.createPdf(dd).download('constacia-cromatica.pdf');

  }
}
