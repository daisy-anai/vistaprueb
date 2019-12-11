import { Component, OnInit,Input, ModuleWithComponentFactories } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGEOAXACAWEB } from "../../../assets/imgoaxacagobmx";
import { IMAGE } from "../../../assets/imglogo";
//servicios
import { MediumDataService } from '../../shared/services/medium.data.service';
import { VerificarcionService }from '../../verificacion/verificacion.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'reporte-cromatica-incompleta',
  templateUrl: './reporte-cromatica.component.html',
  styleUrls: ['./reporte-cromatica.component.css']
})

export class ReporteCromaticaComponent implements OnInit {
  @Input() color: string;
  @Input() modalidad: string;
  @Input() idhistory: string;

  public concesion : any;
  public vehiculo: any;
  public placas: any;
  public history: any;
  public formatted_date: any;
 
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
      const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULLIO", "AUGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIMEBRE", "DICIEMBRE"];
      let date = new Date()
       this.formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
  }

  assignData(){
    let secciones = [];
    this.service.historybyID(this.idhistory).subscribe(({ data })=>{
      this.history = data['history'];
      for (let i = 0; i < this.history.review.sections.length; i++) {
        secciones.push({columns: [{text:' '+(this.history.review.sections[i].name +'').toUpperCase(), fontSize: 9, bold: true, alignment:'center'}]});
        secciones.push({columns:[{text:'\n'}]});
        for (let j = 0; j < this.history.review.sections[i].properties.length; j++) {
          if(this.history.review.sections[i].properties[j].checked == false){
            secciones.push({columns: [{ text:''+ (this.history.review.sections[i].properties[j].name +' ').toUpperCase(), fontSize: 9, bold: true}]});
            secciones.push({columns:[{text:'\n'}]});
            if(this.history.review.sections[i].properties[j].propertyType == 'texto'){
              secciones.push({columns: [{text: ['Descripción:' ,{ text: this.history.review.sections[i].properties[j].value , bold: false, fontSize:9}], fontSize: 9, bold: true} ]});
              secciones.push({columns:[{text:'\n\n'}]});
            }
          }else{
            secciones.push({columns: [{ text:''+ (this.history.review.sections[i].properties[j].name +' ').toUpperCase(), fontSize: 9, bold: true}]});
            secciones.push({columns:[{text:'\n'}]});
          }
         } 
        if(i==this.history.review.sections.length-1){
          this.generarpdf(secciones);
        }      
      }  
    });
  }
  
  
  generarpdf(secciones){

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
                { width: 240, text: 'CONTROL DE TRANSPORTE', fontSize: 12,bold: true , margin: [0, 10, 0, 0]},
                { width: 240, text: 'NÚMERO DE FOLIO:', fontSize: 5,bold: true , margin: [0, 10, 0, 0]},
              ]
            },
            { columns:
              [
                { width: 282, text: ''},
                { width: 240, text: 'LUGAR Y FECHA:'+this.formatted_date, fontSize: 7,bold: true , margin: [0, 10, 0, 0]},
              ]
            },
            { columns:
              [
                {  width: 250, text: 'CONCESIONARIO DEL SERVICIO PÚBLICO                                DE TRANSPORTE EN LA MODLIDAD DE                                                   P R E S E N T E \n\n\n', fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
              ]
            },
            { columns:
              [
                {
                    alignment: 'justify',text: ['De conformidad en lo dispuesto por los artículos 27, fracción VII, 40 fracciones I ,III,VI y XVIII de la Ley Orgánica del Poder Ejecutivo del Estado de Oaxaca; artículos 1, 3, 4, 7, 10, 11, 39 y 40 de la Ley de Procedencia y Justicia Administrativa para el Estado de Oaxaca; artículos 1, 2, 6, 11 fracción I y II, 13 fracciones I, XII y XXX, 28, 35, 102, 103, 107, 108 y 145 de la Ley de Transporte del Estado de Oaxaca; artículos 43 fracción II,IV y VIII, 44 fracción I y II, 63 concepto 21 y 25 del Reglamento de la Ley de Transporte del Estado de Oaxaca; artículo 31 fracción II,IV y VII, 32 fracción I del Reglamento Interno de la Secretaría de Vialidad y Transporte; el acuerdo por el que el Secretario de Vialidad y Transporte del Poder Ejecutivo del Estado de Oaxaca, delega facultades al Titular de la Dirección de Operación del Transporte Público de la misma dependencia, publicado el seis de julio del año dos mil trece en el Periódico Oficial del Gobierno del Estado; y por las instrucciones del Director de Operación del Transporte Público ',{text:'Ing. Felipe Reyna Romero',bold:true}, 'se le requiere para que presente la unidad de motor; ',{text:'con las siguientes características:',bold:true} ], fontSize: 9
                }
              ]
            },
            {
              columns:
              [
                {  width: 250, text: 'NUC: '+this.concesion.nuc, fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
                {  width: 250, text: 'PLACAS: '+this.placas, fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
              ]
            },
            {
              columns:
              [
                {  width: 250, text: 'NÚMERO DE SERIE: '+this.vehiculo.serie, fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
                {  width: 250, text: 'MOTOR: '+this.vehiculo.motor, fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
              ]
            },
            {
              columns:
              [
                {  width: 250, text: 'MARCA: '+this.vehiculo.marca.nombre, fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
                {  width: 250, text: 'TIPO : '+this.vehiculo.tipo.nombre, fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
              ]
            },
            {
              columns:
              [
                {  width: 250, text: 'MODELO: '+this.vehiculo.anioModelo, fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
                {  width: 250, text: 'COLOR:  '+ (this.color+ '').toUpperCase(), fontSize: 9,bold: true ,toUpperCase: true, margin: [0, 10, 0, 0]},
              ]
            },
            {
              columns:
              [
                {  width: 250, text: 'AGRUPACIÓN (SITIO):'+this.concesion.sitio.nombre+ '\n\n', fontSize: 9,bold: true , margin: [0, 10, 0, 0]},
              ]
            },
            {
              columns:
              [
                {  alignment: 'justify',text: ['Ante la Dirección  de Operación del Tranporte Público de la Secretaría de Vialidad y Transporte del Estado de Oaxaca, en Avenida Carlos Gracida Número 09, Colonia la Experimental, San Antonio de la Cal, Oaxaca (OFICINAS DE SEVITRA), en 30 días NATURALES a partir de su notificación. \n\n',], fontSize: 9}
              ]
            },
            {
              columns:
              [
                {  alignment: 'justify',text: ['A efecto que sea inspeccionada de acuerdo a los lineamientos de ',{text:'NORMA TÉCNICA NT-OAXSEVITRA-01-2015 ',bold:true}, ', CROMATICA, ELEMENTOS DE IDENTIDAD Y LINEAMIENTOS QUE DEBERÁN SEGUIR LOS VEHÍCULOS QUE PERESENTAN EL SERVICIO DE TRANSPORTE PÚBLICO EN SUS DIVERSAS MODALIDADES, QUE CUENTEN CON CONCESIÓN O PERMISO RECONOCIDOS POR LA SECREARIA DE LA VIALIDAD Y TRANSPORTE, la cual fué publicada a través del Periódico Oficial del Gobierno del Estado con fecha 03 de Octubre del año 2015, misma que entró en vigor al día siguiente de la publicación, donde de manera expresa en el transitorio segundo se otorgó a los concesionarios disponer de 30 dias a partir del inicio de su vigencia, para adecuar sus vehículos a las especificaciones y caracteristicas establecidas en el art. 28 de la Ley de Transporte del Estado de Oaxaca; de no cumplir con lo anterior expuesto, sele aplicará la sanción correspondiente.', ], fontSize: 9 }
              ]
            },
            {
              columns:
              [
                  { width: 180, text: 'ATENTAMENTE                                                                 SUFRAGIO EFECTIVO NO REELECCIÓN                                "EL RESPETO AL DERECHO AJENO ES LA PAZ"\n\n\n\n\n', fontSize: 7, margin: [0, 10, 0, 0]},
              ]
            },
            {columns:
              [
                { text:'__________________________________________________________',fontSize: 7},
              ]
            },
            {
              columns:
              [
                { width: 250, text: ' INSPECTOR DE CROMÁTICA    ',fontSize: 7, margin: [0, 10, 0, 0]},
                { text:'\n\n\n\n'}
              ]
            }, {columns:
              [
                { text:'__________________________________________________________',fontSize: 7},
                { text:'__________________________________________________________',fontSize: 7},
              ]
            },
            {
              columns:
              [
                { width: 250, text: ' NOMBRE Y FIRMA QUIEN RECIBE LA NOTIFICACION  ', fontSize: 7, margin: [0, 10, 0, 0]},
                { width: 250, text: ' FECHA DE LA NOTIFICACIÓN/NÚM DE TELÉFONO   ', fontSize: 7, margin: [0, 10, 0, 0]},
                { text:'\n\n'}
              ]
            },
            {
              columns:
              [
                { alignment: 'justify',text:"En fundamentos en los artículos 68,116 y 120 de la Ley General de Transparencia y Accceso a la información Pública 56,57,58 y 62 de la Ley de Trasparecia y Acceso a la información Pública del Estado de Oaxaca, 16,17,18,19,20 y 21 de la Ley General de Protección de datos Personales en Posesión de Sujetos Obliagados , 9,10,11,12,13 y 14 de la Ley de Protección de Datos personales en Posesión de Sujetos Obligatorios del Estado de Oaxaca, los datos personales contenidos en el presente documento están protegidos, por tanto, solo podran ser usados paralos fines los cuales fueron entregados, cualquier uso deberán ser autorizado por el titular de los mismos, asi mismo por lo previsto en los artículos 1 y 13 de la Ley de Transporte del Estado de Oaxaca, 331 Reglamento interno de la Secretaria de Vialidad y Transporte.\n" , fontSize: 4}
               ]
            },
            {
              columns:
              [
               { image:  'data:image/jpeg;base64,'+IMAGEOAXACAWEB.IMAGE_W,width: 50,height: 500, absolutePosition: {x: 530, y: 180}},
              ]
            },
            {
              columns:
              [
                {  columns:
                   [{ width: 200,text:"CP. Lic.Mariana Erandy Nassar Piñeyro- Secretaria de Movilidad para su conocimiento                                              Lic. Mario Alberto Guzmán Jaime- subsecretario de regulación y Control de Transporte  Público-Mismo fin               Ing Felipe Reyna Romero -Director de Operación del Transporte Público- Mismp fin                                                                                     Arq. Marino Hernandez Lopez- Jefe de Departamento de Control de Transporte- Mismo Fin    Expediente *Minotario* " , fontSize: 4}]
                },
               {
                 columns:
                 [  { width: 10, text: ''},
                    { width: 200,text:"Para mayor información consulte la página www.semovi.oaxaca.gob.mx; telefono: atención 0 1( 9 5 1) 5 0 1 6 6 9 1, Ext 1622; o enviar un correo electronico a: controldetransporte@semovioaxaca.gob.mx *OPCIONAL" , fontSize: 4,pageBreak: 'after'}
                   
                  ]         
                } 
              ]
            },
            //nueva pagina 
            {
              columns:
              [
                { text: "Plan de Reordenamiento", bold:true}
              ]
            },
            {
              columns:
              [
                {  width: 250, text: 'Norma Técnica NT-OAX-SEVITRA-01-2015 \n\n\n', fontSize: 9,bold: true , margin: [0, 0, 0, 0]},
              ]
            },
            {
              columns:
              [
                
                { width: 250,alignment: 'justify', text: 'Cromática, elementos de identidad y lineamientos que deberán seguir los vehículos que pŕesentan el sercicio de Transporte Público en sus diversas modalidades,que cuenten con Concesión o permioso reconocidos por la Secretaria de Movilidad. \n\n\n', fontSize: 9,bold: false , margin: [0, 10, 0, 0]},
                {width:15, text:''},
                { width: 250,text: ['CROMÁTICA AUTORIZADA                               ',{alignment: 'justify',text:'PARA EL SERVICIO DE TRNASPORTE PÚBLICO EN LA MODALIDAD ', fontSize:8,bold:false,},{text: (this.modalidad + '').toUpperCase(), fontSize:12,bold:true}],fontSize: 12,bold: true , margin: [0, 10, 0, 0]}

              ]
            },
            {
              columns:
              [
                { text: 'DATOS A CORREGIR', bold:true, fontSize: 12 ,uppercase: true, alignment:'center'},
              ]
            },secciones,
            {
              columns:
              [
               { image:  'data:image/jpeg;base64,'+IMAGEOAXACAWEB.IMAGE_W,width: 50,height: 500, absolutePosition: {x: 530, y: 180}},
              ]
            }
          ]
        }; 
        
          //Descargar el PDF
     pdfMake.createPdf(dd).download('reporte-cromatica-incompleto.pdf');
      // }
  }
}
