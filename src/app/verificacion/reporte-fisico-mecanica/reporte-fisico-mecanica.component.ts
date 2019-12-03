import { Component, OnInit, Input } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGEOAXACAWEB } from "../../../assets/imgoaxacagobmx";
import { IMAGE} from "../../../assets/imglogo"; 
import { IMAGE_BANNER } from "../../../assets/banner";
import { Cuadro}from '../../../assets/square';
import { Square} from '../../../assets/square2';

//models
// import {} from '../../shared/models/'
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
  @Input() domicilioConcesionario:string;
  @Input() coloniaConcesionario:string;
  @Input() numeroAcuerdo: string;
  @Input() vencimiento:string;
  @Input() nombreConductor:string;
  @Input() linea:string;
  @Input() tipoClase:string;
  @Input() numeroPoliza:string;
  @Input() vencimientoVehiculo:string;
  @Input() color:string;
  @Input() idhistory: string;




  public concesion : any;
  public vehiculo: any;
  public placas: any;
  public history: any;

  constructor(
    private shared?: MediumDataService,
    private service?: VerificarcionService
    ){}

  ngOnInit() {
     this.concesion = this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
    for (const placa of this.vehiculo.placa) {
      this.placas = placa.matricula;  
      }
      // for (const secciones of this.history.review.sections) {

        // for (const propiedad of secciones.properties) {
          
        //  } 
  }
  generarpdf(){
    let historial = [];
    this.service.historybyID('ZYK4w9aAOdvMRnBp').subscribe(({ data })=>{
      this.history = data['history'];
      for (let i = 0; i < this.history.review.sections.length; i++) {
         console.log(this.history.review.sections[i].name);      
         historial.push({columns: [{text: this.history.review.sections[i].name , fontSize: 9}]});
      //  historial.push(this.history.review.sections[i].name);
        console.log( historial);
        
      }
    });
      


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
      watermark: { text: '\n\n\n\n\n        FORMATO DE PRE-TRAMITE\n\nSIN VALOR OFICIAL', color: 'gray', opacity: 0.2, bold: true, italics: false },

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
            { alignment:'right',width: 240, text:'PLACAS:'+this.placas, fontSize: 8, bold:true}
           ]
        },
        { columns:
          [
            {
              table: 
              {
                widths: [120, 120, 120,120],
                body: [
                  [{text: ' DATOS DEL CONESIONARIO',bold:true ,fontSize:9, colSpan: 4, alignment: 'center'},{},{},{}],
                  // [{text: 'Nombre completo: '+this.concesion.concesionario.nombre+' '+ this.concesion.concesionario.primerApellido +' '+this.concesion.concesionario.segundoApellido , colSpan: 4,bold:true ,fontSize:8, alignment: 'left'},{},{},{}],
                  [{text: ['Nombre Completo:  ',{text:this.concesion.concesionario.nombre +' '+this.concesion.concesionario.primerApellido+' '+this.concesion.concesionario.segundoApellido ,bold:false}, '', ], fontSize:8 ,alignment: 'justify', colSpan:4, bold:true},{},{},{}],
                  [{text: 'Domicilio(calle y número):  '+this.domicilioConcesionario, bold:true ,fontSize:8, colSpan:3},{},{},{ text: 'Colonia: '+this.coloniaConcesionario, bold:true, fontSize:8}],
                  [{text: 'Población:  '+this.concesion.concesionario.localidad.nombre, bold:true ,fontSize:8, colSpan:2,},{},{ text: 'Municipio: '+this.concesion.concesionario.localidad.municipio.nombre, bold:true, fontSize:8, colSpan:2},{}],
                  [{text: 'Sitio o Agrupación:  '+this.concesion.sitio.nombre, bold:true ,fontSize:8, colSpan:2},{},{text:'N° de Acuerdo: '+ this.numeroAcuerdo,bold:true,fontSize:8},{text: 'Vencimiento: '+this.vencimiento, bold:true, fontSize:8}],
                  [{ alignment: 'center', text: 'DATOS DEL CONDUCTOR',fontSize:9, bold:true ,colSpan: 4},{},{},{}],
                  [{text: 'Nombre completo:  '+this.nombreConductor, colSpan: 4,bold:true ,fontSize:8, alignment: 'left'},{},{},{}],
                  [{text: 'N° de Licencia ', bold:true ,fontSize:8},{text:'Tipo de Licencia:' ,bold:true, colSpan:2,fontSize:8},{},{text: 'Vencimiento: ', bold:true, fontSize:8}],
                  [{ alignment: 'center', text: 'DATOS DEL VECHÍCULO',fontSize:9, bold:true,colSpan: 4},{},{},{}],
                  [{text: 'Marca: '+this.vehiculo.marca.nombre, bold:true ,fontSize:8},{text:'Linea:' +this.linea,bold:true, colSpan:2,fontSize:8},{},{text: 'Tipo y Clase: '+this.tipoClase, bold:true, fontSize:8}],
                  [{text: 'N° de Motor: ', bold:true ,fontSize:8},{text:'N° de Serie:   ' +this.vehiculo.serie ,bold:true, colSpan:2,fontSize:8},{},{text: 'Modelo:  ', bold:true, fontSize:8}],
                  [{text: 'Color Oficial: '+this.color, bold:true ,fontSize:8},{text:'N.U.C:  ' + this.concesion.nuc,bold:true,fontSize:8},{text:'N° de Poliza'+this.numeroPoliza,bold:true, fontSize:8},{text: 'Vencimiento: '+this.vencimientoVehiculo, bold:true, fontSize:8}],
                 
                  [{alignment: 'center', text: 'CALCAS DEL VEHÍCULO',fontSize:9, bold:true,colSpan: 4 },{},{},{}],
                  [{text: 'N° de Motor:  ', fontSize:8, bold:true,margin: [0, 30,0, 0], colSpan:4},{},{},{}],
                  [{text: 'N° de Serie ', fontSize:8, bold:true,margin: [0, 30,0,0],colSpan:4 },{},{},{}],
                  [{text: 'N° de Placa VIN ', fontSize:8, bold:true,margin: [0, 30,0, 0],colSpan:4 },{},{},{}],
                  [{text: 'N° de Cabina', fontSize:8, bold:true,margin: [0, 30,0, 0],colSpan:4},{},{},{}],
                  [{text:'PRÓRROGAS',fontSize:8, bold:true},{text:'Primera',fontSize:8, bold:true, upperCase:true},{text:'segunda',fontSize:8, bold:true},{text:'tercera',fontSize:8, bold:true}],
                  [{text: ' OBSERVACIONES',bold:true ,fontSize:9, colSpan: 4, alignment: 'center'},{},{},{}],
                  [{text: ' \n\n',bold:true ,fontSize:9, colSpan: 4, alignment: 'center',margin: [0, 30,0, 0]},{},{},{}],       
                ]
		      	  }
            }
          ] 
        },
        {
          columns:
          [
            {text:'\n'}
          ]
        },
        {
          columns:
          [ 
            {text:' CONCECIONARIO',bold:true, fontSize:7, absolutePosition: {x:170, y: 578}},
            {text:' SI APTO         /       NO APTO', fontSize:6, bold:true,absolutePosition: {x:450, y: 578}},

          ]
        },
        {
          columns:
          [

            {text:'__________________________                   ______________',absolutePosition: {x:70, y: 600}},
          ] 
        },
        {
          columns:
          [  
            {text:'Nombre completo                                                                               Firma', fontSize:6, absolutePosition: {x:120, y: 615}},
          ]
        },
        {
          columns:
          [
            {text:'__________________________________________________',absolutePosition: {x:70, y: 620}},
  
          ]
        },
        {
          columns:
          [
            {text:'Vo. Bo.', fontSize:6,absolutePosition: {x:200, y: 635}},
            {text:'\n\n\n'}
          ]
        },
    
        {
          columns:
          [
             {text:'Encargado del Área de Revista Físico Mecánica', fontSize:6,absolutePosition: {x:70, y: 670}},
          ]
        },
        {
          columns:
          [
            {text:'__________________________                   ______________',absolutePosition: {x:70, y: 678}},
          ]
        },{
          columns:
          [
            {text:'Nombre completo                                                                                    Firma', fontSize:6, absolutePosition: {x:120, y: 690}},
          ]
        },
        {
          columns:
          [
             {text:'_________________________a_____________de ____________20___', fontSize:6,absolutePosition: {x:120, y: 750}}
          ]
        },
        {
          columns:
          [
            { image: 'data:image/jpeg;base64,'+Cuadro.cuadro,width: 160,height: 80,absolutePosition: {x:405, y: 570}},
            {text:'Sello Revista Físico Mecánica',fontSize:6,absolutePosition: {x:450, y: 590}},

          ]
        },
        {
          columns:
          [
            { image: 'data:image/jpeg;base64,'+Square.square,width: 310,height: 150,absolutePosition: {x:50, y: 570}},

          ]
        },
        {
          columns:
          [
            {text:'', pageBreak: 'after'}
          ]
          
        }, historial,
        // {
        //   columns:
        //   [
        //    {
        //      table:{
        //        body: historial
        //      }
        //    }
        //   ]

        // },
        {
          columns:
          [
            {text:''}
          ]
        }
      ]
    };
    pdfMake.createPdf(dd).download('reporte-fisicoMecanica.pdf');

  }

}
