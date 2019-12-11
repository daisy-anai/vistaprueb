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
import { VerificarcionService }from '../../verificacion/verificacion.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'reporte-fisico-mecanica',
  templateUrl: './reporte-fisico-mecanica.component.html',
  styleUrls: ['./reporte-fisico-mecanica.component.css']
})
export class ReporteFisicoMecanicaComponent implements OnInit {
 
  @Input() idhistory: string;





  public concesion : any;
  public vehiculo: any;
  public placas: any;
  public history: any;
  public license: any;

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
   
      console.log(this.idhistory);
      
  }

  rellenarArreglo(){
    let secciones = [];
    let placas = [];

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

  generarpdf(secciones:any){
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
            {text:'DATOS A CORREGIR', bold:true, fontSize:9, alignment:'center'}
          ]
        },secciones,
      ]
    };
    pdfMake.createPdf(dd).download('reporte-fisicoMecanica.pdf');

  }

}
