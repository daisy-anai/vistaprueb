import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

//import {IMAGE} from "../user/core/key/imgoaxacagobmx";

@Component({
  selector: 'app-reporte-cromatica',
  templateUrl: './reporte-cromatica.component.html',
  styleUrls: ['./reporte-cromatica.component.css']
})

export class ReporteCromaticaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  generarpdf(){
    var imageBase64Data = `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`;    
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
      pageMargins: [ 70, 80, 70, 140 ],
      header:
          { columns:
            [
             // { image:  'data:image/jpeg;base64,'+IMAGE.IMAGE_B,width: 200,height: 51, margin: [0, 35, 0, 0]}
              { width: 320,text: ''},
              { image: 'data:image/jpeg;base64,'+imageBase64Data,width: 200,height: 51, margin: [0, 35, 0, 0]}
            ]
          },
      content: 
          [
            { columns: 
              [
                { width: 282, text: ''},
                { width: 240, text: 'CONTROL DE TRNASPORTE', fontSize: 15,bold: true , margin: [0, 10, 0, 0]},
                { text: 'DE TRANSPORTE EN LA MODLIDAD DE', fontSize: 9 , margin: [ 60, 0, 0, 3 ] },
                { text: 'P R E S E N T E', fontSize: 9 , margin: [ 60, 0, 0, 7 ] }
              ]
            },
            { columns:
              [
                { width: 282, text: ''},
                { width: 240, text: 'LUGAR Y FECHA', fontSize: 9,bold: true , margin: [0, 10, 0, 0]}  
              ]

            },
            { columns: 
              [
                { width: 282, text: ''},
                { width: 240, text: 'CONCESIONARIO DEL SERVICIO PÚBLICO', fontSize: 9,bold: true , margin: [0, 10, 0, 0]}  
              ]
            },
            { columns: 
              [
                {
                    alignment: 'justify',text: ['De conformidad en lo dispuesto por los artículos 27,... y por las instrucciones del Director de operación del transporte Público',{text:'Ing. Felipe Reyna Romero',bold:true}, 'se le requiere para que presente la unidad de motor;',{text:'con las siguientes características:',bold:true} ], fontSize: 11
                }
              ]
            },
            {//letras en negrita.. 
              columns:
              [
                {
                  alignment: 'center',
                  width: '35%',
                  text: ['',{text:'NUC',bold:true, fontSize: 9} ]
                }
              ]            
            },
            {
              columns: 
              [
                {
                    alignment: 'justify',text: ['Ante la Dirección  de Operación del Tranporte..',{text:'NORMA TÉCNICA NT-OAXSEVITRA-01-2015',bold:true}, ',CROMATICA,ELEMENTOS DE IDENTIDAD Y LINEAMIENTOS..', ], fontSize: 11
                }
              ]
            },
            { columns:
              {
                //voltear la imagen verticalmente
               // image:  'data:image/jpeg;base64,'+IMAGE.IMAGE_B,width: 230,height: 60,
                absolutePosition: {x: 560, y: 10}
              }      
            }       
          ] };
     //Descargar el PDF
     pdfMake.createPdf(dd).download('Ejemplo.pdf');
  }
}
