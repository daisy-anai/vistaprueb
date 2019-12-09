import { Component, OnInit,Input} from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGEOAXACAWEB } from "../../../assets/imgoaxacagobmx";
import { IMAGE } from "../../../assets/imglogo";
//servicios
import { MediumDataService } from '../../shared/services/medium.data.service';
import { VerificarcionService }from '../../verificacion/verificacion.service';
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'historial-cromatica',
  templateUrl: './historial-cromatica.component.html',
  styleUrls: ['./historial-cromatica.component.css']
})
export class HistorialCromaticaComponent implements OnInit {
  @Input() historyID: string;

  public concesion : any;
  public vehiculo: any;
  public history: any
  public hola: string='holaaaa';
  constructor(
    private shared?: MediumDataService,
    private service?: VerificarcionService
    ){}

  ngOnInit() {

    this.concesion = this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
    
  }
  assignData(){
    let historial=  [];
    const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULLIO", "AUGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIMEBRE", "DICIEMBRE"];

    this.service.historyByVehiculo(this.vehiculo.id).subscribe(({ data })=>{
      this.history = data['historyByVehiculo'];
      for (let i = 0; i < this.history.length; i++) {        
        if(this.history[i].catalogue.catalogueType.name == 'cromática'){
          let current_datetime = new Date(this.history[i].created_at)
          let fecha = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
          historial.push({columns:[{text:'Fecha: '+ fecha,alignment:'right', fontSize:9, bold:true}]});
          historial.push({columns:[{text:'\n\n'}]});

          for (let j= 0; j < this.history[i].review.sections.length; j++) {
            historial.push({columns: [{text:['',{text:  (this.history[i].review.sections[j].name + '').toUpperCase() , bold: true, fontSize: 9, alignment:'center'}], fontSize: 9, bold: true, uppercase: true ,}]});
            historial.push({columns:[{text:'\n'}]});
            for (let k = 0; k < this.history[i].review.sections[j].properties.length; k++) {
              historial.push({columns: [{ text:''+ (this.history[i].review.sections[j].properties[k].name +' ').toUpperCase(), fontSize: 9, bold: true}]});
              historial.push({columns:[{text:'\n'}]});
              if(this.history[i].review.sections[j].properties[k].propertyType == 'texto'){
                historial.push({columns: [{text: ['Descripción:' ,{ text: this.history[i].review.sections[j].properties[k].value , bold: false, fontSize:9}], fontSize: 9, bold: true} ]});
                historial.push({columns:[{text:'\n\n'}]});
              }else{
              }
            }
          }
          if(this.history[i].is_correct == false){
            let current_datetime = new Date(this.history[i].created_at)
            let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
         
            historial.push({columns: [{text:'LA REVISIÓN DE CROMÁTICA NO FUE EXITOSA EL DÍA:  '+formatted_date, fontSize:9, }]});
            historial.push({columns:[{text:'\n'}]});

          }else{
            let current_datetime = new Date(this.history[i].created_at)
            let formatted_date2 = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
            historial.push({columns: [{text:'LA REVISIÓN DE CROMÁTICA FUE EXITOSAMENTE '+formatted_date2,fontSize:9}]});
            historial.push({columns:[{text:'\n'}]});

          }
          historial.push({columns: [{text:['Descripción del vehículo:  ', { text: this.history[i].description ,bold:false, fontSize:9}],fontSize: 9, bold: true, alignment:'justify',pageBreak: 'after'}]});
          historial.push({columns:[{text:'\n\n'}]});

          if(i==this.history.length -1){
            this.generarPDF(historial)
          }
        }
 
      }
   
    });
  }
  generarPDF(historial: any){
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
            {
              columns:
              [
                {text:(this.hola +'').toUpperCase()}
              ]
            }, 
           
            {
              columns:
              [
                { text: 'HISTORIAL DE CROMÁTICA DEL VEHÍCULO \n\n', bold:true, fontSize: 12 ,uppercase: true, alignment:'center'},
              ]
            },
            {
              columns:
              [
                {text:'\n\n'}
              ]
            },
            {
              columns:
              [
                {text:'DATOS DEL CONCESIONARIO', bold: true, alignment:'center', fontSize:9}
              ]
            },
            { 
              columns:
              [
                { text: ['Nombre del Concesionario: ',{text:this.concesion.concesionario.nombre+' '+this.concesion.concesionario.primerApellido+' '+this.concesion.concesionario.segundoApellido, bold:false, fontSize: 9}], fontSize: 9 , bold: true}
              ]
            },
            {
              columns:
              [
                {text:['Localidad: ',{text: this.concesion.concesionario.localidad.nombre,fontSize:9, bold:false } ],bold:true,fontSize:9}
              ]
            }, {
              columns:
              [
                {text:['Municipio: ',{text: this.concesion.concesionario.localidad.municipio.nombre,fontSize:9, bold:false } ],bold:true,fontSize:9}
              ]
            },
            {
              columns:
              [
                {text:'DATOS DEL VEHÍCULO', alignment:'center', fontSize:9, bold: true}
              ]
            },
            {
              columns:
              [
                {text:['Numero de serie',{text: this.vehiculo.serie , fontSize:9, bold:false}], fontSize:9, bold:true},
                {text:['Sitio',{text: this.concesion.sitio.nombre, fontSize:9, bold:false, alignmen:'right'}], fontSize:9, bold:true, alignmen:'right'},

              ]
            },
           
            {
              columns:
              [
                {text:'\n\n\n'}
              ]
            },historial,
          
          ],
      
        }; 
        
          //Descargar el PDF
     pdfMake.createPdf(dd).download('historial.pdf');
    
      // }
  }

}
