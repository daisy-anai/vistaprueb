import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGEOAXACAWEB } from "../../core/key/imgoaxacagobmx";
import { IMAGE} from "../../core/key/imglogo";  

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte-final-cromatica',
  templateUrl: './reporte-final-cromatica.component.html',
  styleUrls: ['./reporte-final-cromatica.component.css']
})
export class ReporteFinalCromaticaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  generarpdf(){
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
      // 70, 80, 70, 140 
      pageMargins: [ 70, 60, 70, 60 ],
      header:
          { columns:
            [
              { width: 320,text: ''},           
              { image: 'data:image/jpeg;base64,'+IMAGE.IMAGE_B +'\n\n',width: 200,height: 51, margin: [0, 35, 0, 0]},
              { text: '\n\n\n\n\n'},           
            ]
          },
      content: 
          [
            { columns:
              [
                {text:'',fontSize:10}

              ]
            },
            { columns:
              [
                {width:300,text:''},
                {text:'NUMERO DE FOLIO',fontSize:5}

              ]
            },
            { columns: 
              [           
               { width: 240, text: 'CONSTANCIA CROMATICA \n\n', fontSize: 12,bold: true , margin: [0, 10, 0, 0]},               
              ]
            },
            { columns: 
              [
                { text: 'LUGAR: ',fontSize: 7,bold:true },
                { text: 'FECHA: \n\n\n',fontSize: 7,bold:true }
              ]
            },
            { columns:
              [
                {alignment: 'justify',text:['De conformidad en lo dispuesto por los artículos 27, fracción VII, 40 fracciones I ,III,VI y XVIII de la Ley Orgánica del Poder Ejecutivo del Estado de Oaxaca; artículos 1, 3, 4, 7, 10, 11, 39 y 40 de la Ley de Procedencia y Justicia Administrativa para el Estado de Oaxaca; artículos 1, 2, 6, 11 fracción I y II, 13 fracciones I, XII y XXX, 28, 35, 102, 103, 107, 108 y 145 de la Ley de Transporte del Estado de Oaxaca; artículos 43 fracción II,IV y VIII, 44 fracción I y II, 63 concepto 21 y 25 del Reglamento de la Ley de Transporte del Estado de Oaxaca; artículo 31 fracción II,IV y VII, 32 fracción I del Reglamento Interno de la Secretaría de Vialidad y Transporte; el acuerdo por el que el Secretario de Vialidad y Transporte del Poder Ejecutivo del Estado de Oaxaca, delega facultades al Titular de la Dirección de Operación del Transporte Público de la misma dependencia, publicado el seis de julio del año dos mil trece en el Periódico Oficial del Gobierno del Estado; y por las instrucciones del Director de Operación del Transporte Público ',{text:'Ing. Felipe Reyna Romero ',bold:true}, 'se dispone lo siguiente: \n\n',], fontSize: 9 }
             ]

            },
            {
              columns:
              [
               { image:  'data:image/jpeg;base64,'+IMAGEOAXACAWEB.IMAGE_W,width: 50,height: 500,
               absolutePosition: {x: 539, y: 150}}
              ]
            }           
             
          ] 
        };
     //Descargar el PDF
     pdfMake.createPdf(dd).download('Ejemplo.pdf');

  }
}
