import { Component, OnInit,Input} from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGEOAXACAWEB } from "../../../assets/imgoaxacagobmx";
import { IMAGE } from "../../../assets/imglogo"; 
import { Cuadro }from '../../../assets/square';
import { Square } from '../../../assets/square2';

//servicios
import { MediumDataService } from '../../shared/services/medium.data.service';
import { VerificarcionService }from '../../verificacion/verificacion.service';
import { VigenciasService } from '../../vigencias/vigencias.service';

//models
import { Vigencia} from '../../shared/models/vigencia';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'reporte-final-fisico-mecanica',
  templateUrl: './reporte-final-fisico-mecanica.component.html',
  styleUrls: ['./reporte-final-fisico-mecanica.component.css']
})
export class ReporteFinalFisicoMecanicaComponent implements OnInit {
  @Input() domicilioConcesionario:string;
  @Input() coloniaConcesionario:string;
  @Input() numeroAcuerdo: string;
  @Input() vencimiento:string;
  @Input() nLicencia:string;
  @Input() numeroPoliza:string;
  @Input() vencimientoVehiculo:string;
  @Input() color:string;
  @Input() idhistory: string;
  @Input() observacion: string;

  public concesion : any;
  public vehiculo: any;
  public placas: any;
  public history: any;
  public license: any;
  public vigencia: Vigencia;
  public formatted_date: any;

  constructor(
    private shared?: MediumDataService,
    private service?: VerificarcionService,
    private serviceVigencias?: VigenciasService

  ) {}

  ngOnInit() {
    
    const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULLIO", "AUGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIMEBRE", "DICIEMBRE"];
    let date = new Date()
    this.formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
    this.concesion = this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();

    this.service.licenseByNumber(this.nLicencia).subscribe(({ data })=>{
      this.license  = data['licenseByNumber'];
    });
    this.serviceVigencias.getVigenciasModalidadByID(this.concesion.modalidad.id).subscribe(({ data })=>{
      [this.vigencia ] = data['validityByModalidad'];  
    });
  }

  rellenarArreglo(){
    var aniosUsados= new Date().getFullYear() - (this.vehiculo.anioModelo + this.vigencia.legal_years);
    var aniosDisponibles =this.vehiculo.anioModelo + this.vigencia.legal_years + this.vigencia.extension_years - new Date().getFullYear();
    let circulo =[];
    let placas =[];
      
    for (const placa of this.vehiculo.placa) {
      this.placas = placa.matricula;  
      placas.push({columns:[{text:['PLACAS: ',{text:placa.matricula +' ',fontSize:8, bold:false}], fontSize:8, alignment: 'right', bold: true}]})
      }
    circulo.push({text: 'PRÓRROGAS: ', fontSize:8, bold:true});
   
    for (let i = 0; i < aniosUsados ; i++) {
      if(i == aniosUsados){
        console.log("iguales");
      }else{
        circulo.push({columns:[{canvas:[{ type: 'ellipse',x: 100+(i*-20), y:-5,color: 'black',fillOpacity: 0.9, r1: 5, r2: 5}]}]});
     }  
    } 
     
    for (let j = 0; j < aniosDisponibles; j++) {
      if(j == aniosDisponibles){
        console.log("igales anios");      
      }else{
        circulo.push({columns:[{canvas:[{ type: 'ellipse', x: 130+(j*-20), y:-5,background:'black' ,fillOpacity: 0.5, r1: 5, r2: 5 }]}]});
      }
    }
    this.generarpdf(placas, circulo);
  }

  generarpdf(placa: any, circulo: any){
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
        {
          columns:
          [
            {}
          ]
        },placa,
        {
          columns:
          [ {text: '\n'} ]
        }, 
        { columns:
          [
            {
              table: 
              {
                widths: [120, 120, 120,120],
                body: [
                  [{text: ' DATOS DEL CONESIONARIO',bold:true ,fontSize:9, colSpan: 4, alignment: 'center'},{},{},{}],
                  [{text: ['Nombre Completo:  ',{text:this.concesion.concesionario.nombre +' '+this.concesion.concesionario.primerApellido+' '+this.concesion.concesionario.segundoApellido ,bold:false}, '', ], fontSize:8 ,alignment: 'justify', colSpan:4, bold:true},{},{},{}],
                  [{text: 'Domicilio(calle y número):  '+(this.domicilioConcesionario +' ').toUpperCase(), bold:true ,fontSize:8, colSpan:3},{},{},{ text: 'Colonia: '+ (this.coloniaConcesionario +' ').toUpperCase(), bold:true, fontSize:8}],
                  [{text: 'Población:  '+this.concesion.concesionario.localidad.nombre, bold:true ,fontSize:8, colSpan:2,},{},{ text: 'Municipio: '+this.concesion.concesionario.localidad.municipio.nombre, bold:true, fontSize:8, colSpan:2},{}],
                   [{text: 'Sitio o Agrupación:  '+this.concesion.sitio.nombre, bold:true ,fontSize:8, colSpan:2},{},{text:'N° de Acuerdo: '+ this.numeroAcuerdo,bold:true,fontSize:8},{text: 'Vencimiento: '+this.vencimiento, bold:true, fontSize:8}],
                  [{ alignment: 'center', text: 'DATOS DEL CONDUCTOR',fontSize:9, bold:true ,colSpan: 4},{},{},{}],
                  [{text: 'Nombre completo:  '+this.license.contribuyente.nombre+' '+this.license.contribuyente.primer_apellido+' '+this.license.contribuyente.segundo_apellido, colSpan: 4,bold:true ,fontSize:8, alignment: 'left'},{},{},{}],
                  [{text: 'N° de Licencia: '+this.nLicencia, bold:true ,fontSize:8},{text:'Tipo de Licencia:  '+this.license.tipo ,bold:true, colSpan:2,fontSize:8},{},{text: 'Vencimiento: '+this.license.fecha_vencimiento, bold:true, fontSize:8}],
                  [{ alignment: 'center', text: 'DATOS DEL VECHÍCULO',fontSize:9, bold:true,colSpan: 4},{},{},{}],
                  [{text: 'Marca: '+this.vehiculo.marca.nombre, bold:true ,fontSize:8},{text:'Linea: ' +this.vehiculo.tipo.nombre,bold:true, colSpan:2,fontSize:8},{},{text: 'Tipo y Clase: '+ (this.concesion.modalidad.nombre +' ').toUpperCase(), bold:true, fontSize:8}],
                  [{text: 'N° de Motor: '+this.vehiculo.motor, bold:true ,fontSize:8},{text:'N° de Serie:   ' +this.vehiculo.serie ,bold:true, colSpan:2,fontSize:8},{},{text: 'Modelo:  '+this.vehiculo.anioModelo, bold:true, fontSize:8}],
                  [{text: 'Color Oficial: '+ (this.color+ ' ').toUpperCase(), bold:true ,fontSize:8},{text:'N.U.C:  ' + this.concesion.nuc,bold:true,fontSize:8},{text:'N° de Poliza:'+this.numeroPoliza,bold:true, fontSize:8},{text: 'Vencimiento: '+this.vencimientoVehiculo, bold:true, fontSize:8}],
                 
                  [{alignment: 'center', text: 'CALCAS DEL VEHÍCULO',fontSize:9, bold:true,colSpan: 4 },{},{},{}],
                  [{text: 'N° de Motor:  ', fontSize:8, bold:true,margin: [0, 30,0, 0], colSpan:4},{},{},{}],
                  [{text: 'N° de Serie ', fontSize:8, bold:true,margin: [0, 30,0,0],colSpan:4 },{},{},{}],
                  [{text: 'N° de Placa VIN ', fontSize:8, bold:true,margin: [0, 30,0, 0],colSpan:4 },{},{},{}],
                  [{text: 'N° de Cabina', fontSize:8, bold:true,margin: [0, 30,0, 0],colSpan:4},{},{},{}],
                  // [{text:'PRÓRROGAS',fontSize:8, bold:true},{text:'Primera',fontSize:8, bold:true, upperCase:true},{text:'segunda',fontSize:8, bold:true},{text:'tercera',fontSize:8, bold:true}],
                  [{text: ' OBSERVACIONES',bold:true ,fontSize:9, colSpan: 4, alignment: 'center'},{},{},{}],                
                  [{text: this.observacion ,bold:true ,fontSize:9, colSpan: 4, alignment: 'justify',margin: [0, 30,0, 0]},{},{},{}], 
                  
                ]
		      	  }
            }
          ] 
        },
        {
          columns:
          [
            {text:' \n'}
          ]

        },circulo,
         {
          columns:
          [
            {text:'\n'}
          ]
        },
        {
          columns:
          [ 
            {text:' CONCECIONARIO',bold:true, fontSize:7, absolutePosition: {x:170, y: 620}},
            {text:' SI APTO         /       NO APTO', fontSize:6, bold:true,absolutePosition: {x:450, y: 620}},

          ]
        },
        {
          columns:
          [

            {text:'__________________________                   ______________',absolutePosition: {x:70, y: 664}},
          ] 
        },
        {
          columns:
          [  
            {text:'Nombre completo                                                                               Firma', fontSize:6, absolutePosition: {x:120, y: 678}},
          ]
        },
        {
          columns:
          [
            {text:'__________________________________________________',absolutePosition: {x:70, y: 680}},
  
          ]
        },
        {
          columns:
          [
            {text:'Vo. Bo.', fontSize:6,absolutePosition: {x:200, y: 698}},
            {text:'\n\n\n'}
          ]
        },
    
        {
          columns:
          [
             {text:'Encargado del Área de Revista Físico Mecánica', fontSize:6,absolutePosition: {x:70, y: 720}},
          ]
        },
        {
          columns:
          [
            {text:'__________________________                   ______________',absolutePosition: {x:70, y: 725}},
          ]
        },{
          columns:
          [
            {text:'Nombre completo                                                                                    Firma', fontSize:6, absolutePosition: {x:120, y: 738}},
          ]
        },
        {
          columns:
          [
             {text:this.formatted_date, fontSize:6,absolutePosition: {x:450, y: 730}}
          ]
        },
        {
          columns:
          [
            { image: 'data:image/jpeg;base64,'+Cuadro.cuadro,width: 160,height: 80,absolutePosition: {x:405, y: 620}},
            {text:'Sello Revista Físico Mecánica',fontSize:6,absolutePosition: {x:450, y: 640}},

          ]
        },
        {
          columns:
          [
            { image: 'data:image/jpeg;base64,'+Square.square,width: 310,height: 150,absolutePosition: {x:50, y: 620}},

          ]
        } 
      ]
    };
    pdfMake.createPdf(dd).download('reporte-fisicoMecanica.pdf');

  }
}
