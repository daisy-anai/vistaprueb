import { Component, OnInit, Input } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGE } from "../../../assets/imglogo";


//servicios
import { MediumDataService } from '../../shared/services/medium.data.service';
import { CatalogoService} from '../../catalogo/catalogo.service'


pdfMake.vfs = pdfFonts.pdfMake.vfs;

//Models
import { Modalidad } from '../../shared/models/modalidad';
import { StorageService } from '../../shared/services/storage.service';

//models
import { User } from '../../shared/models/user';

//service
import { ReporteActividadesService } from '../../reporte-actividades/reporte-actividades.service';
import { getLocaleDateFormat } from '@angular/common';
 declare var M;
@Component({
  selector: 'historial-actividades',
  templateUrl: './historial-actividades.component.html',
  styleUrls: ['./historial-actividades.component.css']
})
export class HistorialActividadesComponent implements OnInit {
  @Input() fromDate :string;
  @Input() to_date: string;


  public formatted_date: any;
  public formatted_date2: any;

  public modalidades: Array<Modalidad>;

  public user: User;
  public completeChecksCromatica: any;
  public incompleteChecksCromatica: any;
  public completeCheckFisicoMecanica: any;
  public incompleteChecksFisicoMecanica: any;
  public historyBetweenDate : any;
  public totalCromaticaCompleto: any;
  public totalCromaticaIncompleto: any;
  public totalFisicoMecnaicaCompleto: any;
  public totalFisicoMecanicaInconpleto: any;

  public incompleteChecks: any;
  
  //sin observaciones
  public taxi: number=0;
  public urbano: number=0;
  public foraneo: number=0;
  public acarreo: number=0;
  public cargaLigera: number=0;
  public especializada: number=0;
  public bicitaxi: number  =0;
  public cargaGeneral: number =0;
  public servicioTuristico: number = 0;
  public escolar: number=0;
  public acarreoAgua: number =0;
  public mototaxi: number =0;
  public cargaPesada: number =0;
  public suburbano: number=0;
  public metropolitano: number=0;
  public personal: number=0;

  // con observaciones
  public taxi2: number=0;
  public urbano2: number=0;
  public foraneo2: number=0;
  public acarreo2: number=0;
  public cargaLigera2: number=0;
  public especializada2: number=0;
  public bicitaxi2: number  =0;
  public cargaGeneral2: number =0;
  public servicioTuristico2: number = 0;
  public escolar2: number=0;
  public acarreoAgua2: number =0;
  public mototaxi2: number =0;
  public cargaPesada2: number =0;
  public suburbano2: number=0;
  public metropolitano2: number=0;
  public personal2: number=0;

  //fisico mecanicas entregdas
  public taxi3: number=0;
  public urbano3: number=0;
  public foraneo3: number=0;
  public acarreo3: number=0;
  public cargaLigera3: number=0;
  public especializada3: number=0;
  public bicitaxi3: number  =0;
  public cargaGeneral3: number =0;
  public servicioTuristico3: number = 0;
  public escolar3: number=0;
  public acarreoAgua3: number =0;
  public mototaxi3: number =0;
  public cargaPesada3: number =0;
  public suburbano3: number=0;
  public metropolitano3: number=0;
  public personal3: number=0;

  //fisico mecanica incompleto pre-revista
  public taxi4: number=0;
  public urbano4: number=0;
  public foraneo4: number=0;
  public acarreo4: number=0;
  public cargaLigera4: number=0;
  public especializada4: number=0;
  public bicitaxi4: number  =0;
  public cargaGeneral4: number =0;
  public servicioTuristico4: number = 0;
  public escolar4: number=0;
  public acarreoAgua4: number =0;
  public mototaxi4: number =0;
  public cargaPesada4: number =0;
  public suburbano4: number=0;
  public metropolitano4: number=0;
  public personal4: number=0;

  public taxis: number=0;
  public urbanos: number=0;
  public foraneos: number=0;
  public acarreos: number=0;
  public cargaLigeras: number=0;
  public especializadas: number=0;
  public bicitaxis: number  =0;
  public cargaGenerals: number =0;
  public servicioTuristicos: number = 0;
  public escolares: number=0;
  public acarreoAguas: number =0;
  public mototaxis: number =0;
  public cargaPesadas: number =0;
  public suburbanos: number=0;
  public metropolitanos: number=0;
  public personales: number=0;


  constructor(
    private catalogueService?: CatalogoService,
    private storageService?: StorageService,
    private service?: ReporteActividadesService,
  
    ){}

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();

    this.service.historyByBetweenDates(this.fromDate,this.to_date).subscribe(({ data})=>{
      this.historyBetweenDate = data['historyByBetweenDates'];      
        for (let i = 0; i < this.historyBetweenDate.length; i++) {
          //cromatica completos
          if(this.historyBetweenDate[i].catalogue.catalogueType.name=='cromática' && this.historyBetweenDate[i].is_correct == true){  
            switch(this.historyBetweenDate[i].catalogue.id_modalidad){
              case 'MD0001': this.taxi++; break;
              case 'MD0003': this.urbano++; break;
              case 'MD0004': this.foraneo++; break;
              case 'MD0005': this.acarreo++; break;
              case 'MD0006': this.cargaLigera++; break;
              case 'MD0007': this.especializada++; break;
              case 'MD0010': this.bicitaxi++; break;
              case 'MD0011': this.cargaGeneral++;break;
              case 'MD0012': this.servicioTuristico++; break;
              case 'MD0013': this.escolar++; break;
              case 'MD0014': this.acarreoAgua++; break;
              case 'MD0017': this.mototaxi++; break;
              case 'MD0019': this.cargaPesada++; break;
              case 'MD0021': this.suburbano++; break;
              case 'MD0022': this.metropolitano++; break;
              case 'MD0023': this.personal++; break;
              default: break;
            } 
          }else if(this.historyBetweenDate[i].catalogue.catalogueType.name=='cromática' && this.historyBetweenDate[i].is_correct == false){
            //cromática incompleto
            switch (this.historyBetweenDate[i].catalogue.id_modalidad ) {
              case 'MD0001': this.taxi2++; break;
              case 'MD0003': this.urbano2++; break;
              case 'MD0004': this.foraneo2++; break;
              case 'MD0005': this.acarreo2++; break;
              case 'MD0006': this.cargaLigera2++; break;
              case 'MD0007': this.especializada2++; break;
              case 'MD0010': this.bicitaxi2++; break;
              case 'MD0011': this.cargaGeneral2++;break;
              case 'MD0012': this.servicioTuristico2++; break;
              case 'MD0013': this.escolar2++; break;
              case 'MD0014': this.acarreoAgua2++; break;
              case 'MD0017': this.mototaxi2++; break;
              case 'MD0019': this.cargaPesada2++; break;
              case 'MD0021': this.suburbano2++; break;
              case 'MD0022': this.metropolitano2++; break;
              case 'MD0023': this.personal2++; break;
              default: break;
            }
          }else if(this.historyBetweenDate[i].catalogue.catalogueType.name=='físico mecánica' && this.historyBetweenDate[i].is_correct == true){
            //físico mecánica completo
            switch (this.historyBetweenDate[i].catalogue.id_modalidad ) {
              case 'MD0001': this.taxi3++; break;
              case 'MD0003': this.urbano3++; break;
              case 'MD0004': this.foraneo3++; break;
              case 'MD0005': this.acarreo3++; break;
              case 'MD0006': this.cargaLigera3++; break;
              case 'MD0007': this.especializada3++; break;
              case 'MD0010': this.bicitaxi3++; break;
              case 'MD0011': this.cargaGeneral3++;break;
              case 'MD0012': this.servicioTuristico3++; break;
              case 'MD0013': this.escolar3++; break;
              case 'MD0014': this.acarreoAgua3++; break;
              case 'MD0017': this.mototaxi3++; break;
              case 'MD0019': this.cargaPesada3++; break;
              case 'MD0021': this.suburbano3++; break;
              case 'MD0022': this.metropolitano3++; break;
              case 'MD0023': this.personal3++; break;
              default: break;
            }
          }else if(this.historyBetweenDate[i].catalogue.catalogueType.name=='físico mecánica' && this.historyBetweenDate[i].is_correct == false){
            //fisico mecanica incompleto
            switch (this.historyBetweenDate[i].catalogue.id_modalidad ) {
              case 'MD0001': this.taxi4++; break;
              case 'MD0003': this.urbano4++; break;
              case 'MD0004': this.foraneo4++; break;
              case 'MD0005': this.acarreo4++; break;
              case 'MD0006': this.cargaLigera4++; break;
              case 'MD0007': this.especializada4++; break;
              case 'MD0010': this.bicitaxi4++; break;
              case 'MD0011': this.cargaGeneral4++;break;
              case 'MD0012': this.servicioTuristico4++; break;
              case 'MD0013': this.escolar4++; break;
              case 'MD0014': this.acarreoAgua4++; break;
              case 'MD0017': this.mototaxi4++; break;
              case 'MD0019': this.cargaPesada4++; break;
              case 'MD0021': this.suburbano4++; break;
              case 'MD0022': this.metropolitano4++; break;
              case 'MD0023': this.personal4++; break;
              default: break;
            }
          }
        }
      },(error) => {
        var errores = error.message.split(":");
        var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+errores[1]+'</div></span>';
        M.toast({html: toastHTML});
     });

    const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULLIO", "AUGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIMEBRE", "DICIEMBRE"];
    let date= new Date(this.fromDate);
    let date2= new Date(this.to_date);
    this.formatted_date = date.getDate()+1 + "-" + months[date.getMonth()] + "-" + date.getFullYear();
    this.formatted_date2 = date2.getDate()+1 + "-" + months[date2.getMonth()] + "-" + date2.getFullYear();

     
  }

  showData(){
    this.taxis = this.taxi+this.taxi2+this.taxi3+this.taxi4;
    this.urbanos = this.urbano+this.urbano2+this.urbano3+this.urbano4;
    this.foraneos = this.foraneo+this.foraneo2+this.foraneo3+this.foraneo4;
    this.acarreos = this.acarreo+this.acarreo2+this.acarreo3+this.acarreo4;
    this.cargaLigeras =this.cargaLigera+ this.cargaLigera2+this.cargaLigera3+this.cargaGeneral4;
    this.especializadas = this.especializada+this.especializada2+this.especializada3+this.especializada4;
    this.bicitaxis = this.bicitaxi+this.bicitaxi2+this.bicitaxi3+this.bicitaxi4;
    this.cargaGenerals = this.cargaGeneral+this.cargaGeneral2+this.cargaGeneral3+this.cargaGeneral4;
    this.servicioTuristicos = this.servicioTuristico+this.servicioTuristico2+this.servicioTuristico3+this.servicioTuristico4;
    this.escolares = this.escolar+this.escolar2+this.escolar3+this.escolar4;
    this.acarreoAguas =this.acarreoAgua+ this.acarreoAgua2+this.acarreoAgua3+ this.acarreoAgua4;
    this.mototaxis = this.mototaxi+ this.mototaxi2+this.mototaxi3+ this.mototaxi4;
    this.cargaPesadas = this.cargaPesada+this.cargaPesada2+this.cargaPesada3+this.cargaPesada4;
    this.suburbanos = this.suburbano+this.suburbano2+this.suburbano3+this.suburbano4;
    this.metropolitanos = this.metropolitano+this.metropolitano2+this.metropolitano3+this.metropolitano4;
    this.personales = this.personal+this.personal2+this.personal3+this.personal4;

    let listaModalidades=[];
    this.catalogueService.getModalidades().subscribe(({ data })=>{
      this.modalidades = data['modalidades'];
      for (let i = 0; i < this.modalidades.length; i++) {
        listaModalidades.push({ headerRows: 1, text: this.modalidades[i].nombre, fontSize:8, bold:true});
        if(i==this.modalidades.length-1){
          this.generarPDF(listaModalidades); 
        }   
      }
    });
  }

  generarPDF(listaModalidades: any){
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
              { width: 320,text: ' '},
            ]
          },
      content:
          [  
            {text: 'REPORTE DE ACTIVIDADES', bold:true, fontSize: 10 , alignment:'center'},       
            {text: 'DEL '+ this.formatted_date+'  AL '+ this.formatted_date2,fontSize:10, bold: true, alignment: 'center'},
            {text: 'DEPARTAMENTO DE CONTROL DE TRANSPORTE ', bold:true, fontSize: 10, alignment:'center', background:'gray',fillOpacity: 0.1},
            {text: '\n ',fontSize:10, bold: true, alignment: 'center'},
            { 
              table:
              { 
                widths: [100, 58, 58,58,58,58,58],
                
                body:
                [
                  [{rowSpan: 2, text: 'ACTIVIDAD', fontSize:8, bold: true}, {colSpan:6,text:'Unidades Revisadas por Inspeccion', fontSize:8, bold:true, alignment:'center'}, {},{},{},{},{}],
                  ['',{text: 'Total/unidades\nrevisadas', fontSize:7},{text: 'Sin observaciones', fontSize:7},{text:'Con observaciones', fontSize:7},{text:'Revista físico-mecánicas\nentregadas', fontSize:7},{text:'Pre-revistas',fontSize:7},{text:'TOTAL/UNIDADES\n ATENDIDAS X\n MODALIDAD',fontSize:7}],
                  [listaModalidades, 
                  [{text:this.taxis, alignment:'center', fontSize:8, style: 'tableHeader'},
                  {text: this.urbanos, alignment:'center', fontSize:8},
                  {text: this.foraneos, alignment:'center', fontSize:8},
                  {text: this.acarreos,alignment:'center', fontSize:8},
                  {text: this.cargaLigeras,alignment:'center', fontSize:8},
                  {text: this.especializadas, alignment:'center', fontSize:8},
                  {text: this.bicitaxis, alignment:'center', fontSize:8},
                  {text: this.cargaGenerals,alignment:'center', fontSize:8},
                  {text: this.servicioTuristicos, alignment:'center', fontSize:8},
                  {text: this.escolares,alignment:'center', fontSize:8},
                  {text: this.acarreoAguas,alignment:'center', fontSize:8},
                  {text: this.mototaxis,alignment:'center', fontSize:8},
                  {text: this.cargaPesadas,alignment:'center', fontSize:8},
                  {text: this.suburbanos,alignment:'center', fontSize:8},
                  {text: this.metropolitanos, alignment:'center', fontSize:8},
                  {text: this.personales,alignment:'center', fontSize:8}],

                  [{text: this.taxi , fontSize:8, alignment:'center'},
                  {text:this.urbano, fontSize:8, alignment:'center'},
                  {text:this.foraneo, fontSize:8, alignment:'center'},
                  {text:this.acarreo, fontSize:8, alignment:'center'},
                  {text:this.cargaLigera, fontSize:8, alignment:'center'},
                  {text:this.especializada, fontSize:8, alignment:'center'},
                  {text:this.bicitaxi, fontSize:8, alignment:'center'},
                  {text:this.cargaGeneral, fontSize:8, alignment:'center'},
                  {text:this.servicioTuristico, fontSize:8, alignment:'center'},
                  {text:this.escolar, fontSize:8, alignment:'center'},
                  {text:this.acarreoAgua, fontSize:8, alignment:'center'},
                  {text:this.mototaxi, fontSize:8, alignment:'center'},
                  {text:this.cargaPesada, fontSize:8, alignment:'center'},
                  {text:this.suburbano, fontSize:8, alignment:'center'},
                  {text:this.metropolitano, fontSize:8, alignment:'center'},
                  {text:this.personal, fontSize:8, alignment:'center'}],

                  [{text:this.taxi2, alignment:'center', fontSize:8},
                  {text:this.urbano2, fontSize:8, alignment:'center'},
                  {text:this.foraneo2, fontSize:8, alignment:'center'},
                  {text:this.acarreo2, fontSize:8, alignment:'center'},
                  {text:this.cargaLigera2, fontSize:8, alignment:'center'},
                  {text:this.especializada2, fontSize:8, alignment:'center'},
                  {text:this.bicitaxi2, fontSize:8, alignment:'center'},
                  {text:this.cargaGeneral2, fontSize:8, alignment:'center'},
                  {text:this.servicioTuristico2, fontSize:8, alignment:'center'},
                  {text:this.escolar2, fontSize:8, alignment:'center'},
                  {text:this.acarreoAgua2, fontSize:8, alignment:'center'},
                  {text:this.mototaxi2, fontSize:8, alignment:'center'},
                  {text:this.cargaPesada2, fontSize:8, alignment:'center'},
                  {text:this.suburbano2, fontSize:8, alignment:'center'},
                  {text:this.metropolitano2, fontSize:8, alignment:'center'},
                  {text:this.personal2, fontSize:8, alignment:'center'}],

                  [{text:this.taxi3, alignment:'center', fontSize:8},
                  {text:this.urbano3, fontSize:8, alignment:'center'},
                  {text:this.foraneo3, fontSize:8, alignment:'center'},
                  {text:this.acarreo3, fontSize:8, alignment:'center'},
                  {text:this.cargaLigera3, fontSize:8, alignment:'center'},
                  {text:this.especializada3, fontSize:8, alignment:'center'},
                  {text:this.bicitaxi3, fontSize:8, alignment:'center'},
                  {text:this.cargaGeneral3, fontSize:8, alignment:'center'},
                  {text:this.servicioTuristico3, fontSize:8, alignment:'center'},
                  {text:this.escolar3, fontSize:8, alignment:'center'},
                  {text:this.acarreoAgua3, fontSize:8, alignment:'center'},
                  {text:this.mototaxi3, fontSize:8, alignment:'center'},
                  {text:this.cargaPesada3, fontSize:8, alignment:'center'},
                  {text:this.suburbano3, fontSize:8, alignment:'center'},
                  {text:this.metropolitano3, fontSize:8, alignment:'center'},
                  {text:this.personal3, fontSize:8, alignment:'center'}],
                  
                  [{text:this.taxi4, alignment:'center', fontSize:8},
                  {text:this.urbano4, fontSize:8, alignment:'center'},
                  {text:this.foraneo4, fontSize:8, alignment:'center'},
                  {text:this.acarreo4, fontSize:8, alignment:'center'},
                  {text:this.cargaLigera4, fontSize:8, alignment:'center'},
                  {text:this.especializada4, fontSize:8, alignment:'center'},
                  {text:this.bicitaxi4, fontSize:8, alignment:'center'},
                  {text:this.cargaGeneral4, fontSize:8, alignment:'center'},
                  {text:this.servicioTuristico4, fontSize:8, alignment:'center'},
                  {text:this.escolar4, fontSize:8, alignment:'center'},
                  {text:this.acarreoAgua4, fontSize:8, alignment:'center'},
                  {text:this.mototaxi4, fontSize:8, alignment:'center'},
                  {text:this.cargaPesada4, fontSize:8, alignment:'center'},
                  {text:this.suburbano4, fontSize:8, alignment:'center'},
                  {text:this.metropolitano4, fontSize:8, alignment:'center'},
                  {text:this.personal4, fontSize:8, alignment:'center'}],
                  
                  [{text: this.taxi+this.taxi2+this.taxi3+this.taxi4, alignment:'center', fontSize:8, style: 'tableHeader'},
                  {text: this.urbano+this.urbano2+this.urbano3+this.urbano4, alignment:'center', fontSize:8},
                  {text: this.foraneo+this.foraneo2+this.foraneo3+this.foraneo4, alignment:'center', fontSize:8},
                  {text: this.acarreo+this.acarreo2+this.acarreo3+this.acarreo4,alignment:'center', fontSize:8},
                  {text: this.cargaLigera+ this.cargaLigera2+this.cargaLigera3+this.cargaGeneral4,alignment:'center', fontSize:8},
                  {text: this.especializada+this.especializada2+this.especializada3+this.especializada4, alignment:'center', fontSize:8},
                  {text: this.bicitaxi+this.bicitaxi2+this.bicitaxi3+this.bicitaxi4, alignment:'center', fontSize:8},
                  {text: this.cargaGeneral+this.cargaGeneral2+this.cargaGeneral3+this.cargaGeneral4,alignment:'center', fontSize:8},
                  {text: this.servicioTuristico+this.servicioTuristico2+this.servicioTuristico3+this.servicioTuristico4, alignment:'center', fontSize:8},
                  {text: this.escolar+this.escolar2+this.escolar3+this.escolar4,alignment:'center', fontSize:8},
                  {text: this.acarreoAgua+ this.acarreoAgua2+this.acarreoAgua3+ this.acarreoAgua4,alignment:'center', fontSize:8},
                  {text: this.mototaxi+ this.mototaxi2+this.mototaxi3+ this.mototaxi4,alignment:'center', fontSize:8},
                  {text: this.cargaPesada+this.cargaPesada2+this.cargaPesada3+this.cargaPesada4,alignment:'center', fontSize:8},
                  {text: this.suburbano+this.suburbano2+this.suburbano3+this.suburbano4,alignment:'center', fontSize:8},
                  {text: this.metropolitano+this.metropolitano2+this.metropolitano3+this.metropolitano4, alignment:'center', fontSize:8},
                  {text: this.personal+this.personal2+this.personal3+this.personal4,alignment:'center', fontSize:8}]
                ], 
                  [{text:'TOTAL', alignment:'center', fontSize:9, bold:true},
                  {text: this.taxis+this.urbanos+ this.foraneos+this.acarreos+this.cargaLigeras+this.especializadas+this.bicitaxis+this.cargaGenerals+this.servicioTuristicos+this.escolares+this.acarreoAguas+this.mototaxis+this.cargaPesadas+this.metropolitanos+this.personales, alignment:'center', fontSize:8},
                  {text: this.taxi+this.urbano+this.foraneo+this.acarreo+this.cargaLigera+this.especializada+this.bicitaxi+this.cargaGeneral+this.servicioTuristico+this.escolar+this.acarreoAgua+this.mototaxi+this.cargaPesada+this.suburbano+this.metropolitano+this.personal, alignment:'center', fontSize:8},
                  {text: this.taxi2+this.urbano2+this.foraneo2+this.acarreo2+this.cargaLigera2+this.especializada2+this.bicitaxi2+this.cargaGeneral2+this.servicioTuristico2+this.escolar2+this.acarreoAgua2+this.mototaxi2+this.cargaPesada2+this.suburbano2+this.metropolitano2+this.personal2, alignment:'center', fontSize:8},
                  {text: this.taxi3+this.urbano3+this.foraneo3+this.acarreo3+this.cargaLigera3+this.especializada3+this.bicitaxi3+this.cargaGeneral3+this.servicioTuristico3+this.escolar3+this.acarreoAgua3+this.mototaxi3+this.cargaPesada3+this.suburbano3+this.metropolitano3+this.personal3, alignment:'center', fontSize:8},
                  {text: this.taxi4+this.urbano4+this.foraneo4+this.acarreo4+this.cargaLigera4+this.especializada4+this.bicitaxi4+this.cargaGeneral4+this.servicioTuristico4+this.escolar4+this.acarreoAgua4+this.mototaxi4+this.cargaPesada4+this.suburbano4+this.metropolitano4+this.personal4, alignment:'center', fontSize:8},
                  {text: this.taxis+this.urbanos+ this.foraneos+this.acarreos+this.cargaLigeras+this.especializadas+this.bicitaxis+this.cargaGenerals+this.servicioTuristicos+this.escolares+this.acarreoAguas+this.mototaxis+this.cargaPesadas+this.metropolitanos+this.personales, alignment:'center', fontSize:8},
                  ] 
                ]
              }
           }  
          ]
        }; 
        //   let name=[]
        // this.catalogueService.getModalidades().subscribe(({ data })=>{
        //   this.modalidades = data['modalidades'];
        //   for (let i = 0; i < this.modalidades.length; i++) {
        //     console.log(this.modalidades[i].nombre);
        //     name.push(this.modalidades[i].nombre);
        //     console.log(name);        
        //     console.log();
        //    console.log( dd.content[4].table.body.push([{ text: '-'+name }, {text:'1'},{text:''+ this.taxi},{text:'3'},{text:'3'},{},{}]));
        //   }
          
        // });
    //console.log(dd.content[3].columns[0]['table']['body'].push([{text:'inteo'}, {text:'1'},{text:'2'},{text:'3'},{text:'3'},{},{}]))
    pdfMake.createPdf(dd).download('actividades.pdf');
    

  }
}
