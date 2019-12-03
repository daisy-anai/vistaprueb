import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGEOAXACAWEB } from "../../../assets/imgoaxacagobmx";
import { IMAGE} from "../../../assets/imglogo"; 
import { IMAGE_BANNER } from "../../../assets/banner";

//servicios
import { MediumDataService } from '../../shared/services/medium.data.service';
import { VerificarcionService }from '../verificacion.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'reporte-fisico-mecanica',
  templateUrl: './reporte-fisico-mecanica.component.html',
  styleUrls: ['./reporte-fisico-mecanica.component.css']
})
export class ReporteFisicoMecanicaComponent implements OnInit {
  public ejemplo: string ='hola';
  constructor(
    private shared?: MediumDataService,
    private service?: VerificarcionService
    ){}

  ngOnInit() {
    console.log("reporte fisico mecanica");
    
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
    var dd ={
      pageSize:'LETTER',
      pageMargins: [ 50, 80, 80, 10 ],
      watermark: { text: 'FORMATO DE PRE-TRAMITE\n\n\n\nSIN VALOR OFICIAL', color: 'gray', opacity: 0.2, bold: true, italics: false },

      header:
        { columns:
          [
            { width: 320,text: ''},
            { image: 'data:image/jpeg;base64,'+IMAGE.IMAGE_B +'\n\n',width: 200,height: 51, margin: [0, 35, 0, 0]},
            { width: 320,text: '\n\n'},
          ]
        },
      content:
      [
        { columns:
          [
            {text: '\n\n'},
            { alignment:'right',width: 240, text:'PLACAS:', fontSize: 8, bold:true}
           ]
        },
        {
          columns:
          [
            
            {  alignment: 'center',text:'DATOS DEL CONCESIONARIO', fontSize:9, bold: true},
            
          ]
        },
        {
          columns:
          [
            {width:240, text: 'Nombre completo: ' ,bold: true ,fontSize:8, margin: [0, 10, 0, 0]}
          ]
        },
        { columns:
          [
            { width: 240,text: 'Domicilio(calle y número): ', bold:true ,fontSize:8, margin: [0, 10, 0, 0]},
            { width: 240, text: 'Colonia: ', bold:true, fontSize:8,margin: [0, 10, 0, 0]}
          ]
        },
        { columns:
          [
            { width: 250, text: 'Población:', bold:true, fontSize:8,margin: [0, 20, 0, 0]},
            { width: 250,text: 'Municipio', bold: true, fontSize: 8,margin: [0, 20, 0, 0]}
          ]
        },
        { columns:
          [
            { width: 180,text: 'Sitio o Agrupación:', fontSize:8, bold:true,margin: [0, 20, 0, 0]},
            { width: 180,text: 'N° de Acuerdo:', fontSize:8, bold:true,margin: [0, 20, 0, 0]},
            { width: 180,text: 'Vencimiento:', fontSize:8, bold:true,margin: [0, 20, 0, 0]}
          ]
        },
        { columns:
          [
            { alignment: 'center', text: 'DATOS DEL CONDUCTOR',fontSize:9, bold:true ,margin:[0, 20, 0, 0]}
          ]
        },
        { columns:
          [
            { width: 200,text: 'Marca:', fontSize:8, bold:true ,margin: [0, 10, 0, 0]},
            { width: 200,text: 'Linea:', fontSize:8, bold:true,margin: [0, 10, 0, 0]},
            { width: 200,text: 'Tipo  y Clase:', fontSize:8, bold:true,margin: [0, 10, 0, 0] }
          ]
        },
        { columns:
          [
            { width: 200,text: 'N° de Motor:', fontSize:8, bold:true, margin: [0, 10, 0, 0]},
            { width: 200,text: 'N° de Serie:', fontSize:8, bold:true, margin: [0, 10, 0, 0]},
            { width: 200,text: 'Modelo :', fontSize:8, bold:true, margin: [0, 10, 0, 0]}
          ]
        },
        { columns:
          [
            { width: 120,text: 'Color Oficial:', fontSize:8, bold:true, margin: [0, 10, 0, 0]},
            { width: 120,text: 'N.U.C :', fontSize:8, bold:true, margin: [0, 10, 0, 0]},
            { width: 120,text: 'Numero de Poliza :', fontSize:8, bold:true, margin: [0, 10, 0, 0]},
            { width: 120,text: 'Vencimiento :', fontSize:8, bold:true,margin: [0, 10, 0, 0]},


          ]
        },
        { columns:
          [
            { alignment: 'center', text: 'CALCAS DEL VEHÍCULO',fontSize:9, bold:true ,margin:[0, 20, 0, 0]}
          ]
        },
        // { columns:
        //   [
        //     { width: 240,text: 'N° de Motor:', fontSize:8, bold:true, margin: [0, 50, 0, 0]},
        //   ]
        // },
        // { columns:
        //   [
        //     { width: 240,text: 'N° de Serie ', fontSize:8, bold:true, margin: [0, 50, 0, 0]},
        //   ]
        // },
        // { columns:
        //   [
        //     { width: 240,text: 'N° de Placa VIN ', fontSize:8, bold:true, margin: [0, 50, 0, 0]},
        //   ]
        // },
        // { columns:
        //   [
        //     { width: 240,text: 'N° de cabina', fontSize:8, bold:true, margin: [0, 50, 0, 0]},
        //   ]
        // },
        {columns:
          [
            {text:'PRÓRROGAS'}
          ]

        },
        {columns:[
          {
            table: {
               heights: [20, 50, 70],
              body: [
                [  {width:240, text: 'Nombre completo: ' ,bold: true ,fontSize:8, margin: [0, 0, 0, 0]}],
                [{ width: 240,text: 'Domicilio(calle y número): ', bold:true ,fontSize:8, margin: [0, 0, 0, 0]}],
                [ { width: 240,text: 'N° de Motor:', fontSize:8, bold:true,margin: [0, 40,400 , 0]}],
                [ { width: 240,text: 'N° de Serie ', fontSize:8, bold:true,margin: [0, 40,400 , 0]}],
                [ { width: 240,text: 'N° de Placa VIN ', fontSize:8, bold:true,margin: [0, 40,400 , 0]}],
                [{ width: 240,text: 'N° de cabina', fontSize:8, bold:true,margin: [0, 40,400 , 0]}],
                
              ]
            }
          }
        ]

        }
       
      
      ]
    };
    pdfMake.createPdf(dd).download('reporte-fisicoMecanica.pdf');

  }

}
