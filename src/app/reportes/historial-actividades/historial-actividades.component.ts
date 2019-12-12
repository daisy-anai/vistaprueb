import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IMAGEOAXACAWEB } from "../../../assets/imgoaxacagobmx";
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

@Component({
  selector: 'historial-actividades',
  templateUrl: './historial-actividades.component.html',
  styleUrls: ['./historial-actividades.component.css']
})
export class HistorialActividadesComponent implements OnInit {

  public formatted_date: any;
  public modalidades: Array<Modalidad>;

  public user: User;
  public completeChecksCromatica: any;
  public incompleteChecks: any;
  public totalChecksTaxi: any;
  public totalChecksUrbano: any
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
  public caragPesada: number =0;
  public suburbano: number=0;
  public metropolitano: number=0;
  public personal: number=0;


  constructor(
    private catalogueService?: CatalogoService,
    private storageService?: StorageService,
    private service?: ReporteActividadesService
    ){}

  ngOnInit() {
    const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULLIO", "AUGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIMEBRE", "DICIEMBRE"];
      let date = new Date()
      this.formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
      
      this.user = this.storageService.getCurrentUser();
      this.service.historyByCompleteChecksWhereCentroTrabajo(this.user.id_centro_trabajo).subscribe(({ data })=>{
        this.completeChecksCromatica = data['historyByCompleteChecksWhereCentroTrabajo'].filter(e => e.catalogue.catalogueType.name ==='cromática');
          // console.log(this.completeChecksCromatica);
          
        for (let i = 0; i < this.completeChecksCromatica.length; i++) {
          switch (this.completeChecksCromatica[i].catalogue.id_modalidad ) {
            case 'MD0001':
              this.taxi++;
              break;
            case 'MD0003':
              this.urbano++;
              break;
            case 'MD0004':
              this.foraneo++;
              break;
            case 'MD0005':
              this.acarreo++;
              break;
            case 'MD0006':
              this.cargaLigera++;
              break;
            case 'MD0007':
              this.especializada++;
              break;
            case 'MD0010':
              this.bicitaxi++;
              break;
            case 'MD0011':
              this.cargaGeneral++;
                break;
            case 'MD0012':
              this.servicioTuristico++;
              break;
            case 'MD0013':
              this.escolar++;
              break;
            case 'MD0014':
              this.acarreoAgua++;
                break;
            case 'MD0017':
              this.mototaxi++;
              break;
            case 'MD0019':
              this.caragPesada++;
                break;
            case 'MD0021':
              this.suburbano++;
              break;
            case 'MD0022':
              this.metropolitano++;
              break;
            case 'MD0023':
              this.personal++;
              break;
             default:
              break;
          }
        } 

      });
   

  }

  showData(){
    let listaModalidades=[];
    this.catalogueService.getModalidades().subscribe(({ data })=>{
      this.modalidades = data['modalidades'];
      for (let i = 0; i < this.modalidades.length; i++) {
          // listaModalidades.push({text: this.modalidades[i].nombre, fontSize:8, bold:true, border: [true,true,true,true]});
          listaModalidades.push(
            { 
              table:
              { 
                widths: [70, 60, 60,60,60,60,60],
                // headerRows: 2,  
                body:
                [
                  [{rowSpan: 2, text: 'ACTIVIDAD', fontSize:8, bold: true}, {colSpan:6,text:'Unidades Revisadas por Inspeccion', fontSize:8, bold:true}, {},{},{},{},{}],
                  ['',{text: 'Total/unidades\nrevisadas', fontSize:7},{text: 'Sin observaciones', fontSize:7},{text:'Con observaciones', fontSize:7},{text:'Revista físico-mecánicas\nentregadas', fontSize:7},{text:'Pre-revitstas',fontSize:7},{text:'TOTAL/UNIDADES\n ATENDIDAS X\n MODALIDAD',fontSize:7}],
                  [{text:'ss'}, {},{},{},{},{},{}],
                   [{text:''+this.modalidades[i].nombre} ,[{text:'ss'}, {text:'vcvvc'}],[{text:''+this.taxi , fontSize:8},{text:''+this.urbano,fontsize:8, fontSize:8,border:[true,true,true,true]}],{},{},{},{}]
                ]
              }
           }
            
          )
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
            {text: 'DEL '+ this.formatted_date ,fontSize:10, bold: true, alignment: 'center'},
            {text: 'DEPARTAMENTO DE CONTROL DE TRNASPORTE ', bold:true, fontSize: 10, alignment:'center', background:'gray',fillOpacity: 0.1},
            {text: '\n ',fontSize:10, bold: true, alignment: 'center'},
            listaModalidades,
            // { 
            //   table:
            //   { 
            //     widths: [70, 60, 60,60,60,60,60],
            //     // headerRows: 2,  
            //     body:
            //     [
            //       [{rowSpan: 2, text: 'ACTIVIDAD', fontSize:8, bold: true}, {colSpan:6,text:'Unidades Revisadas por Inspeccion', fontSize:8, bold:true}, {},{},{},{},{}],
            //       ['',{text: 'Total/unidades\nrevisadas', fontSize:7},{text: 'Sin observaciones', fontSize:7},{text:'Con observaciones', fontSize:7},{text:'Revista físico-mecánicas\nentregadas', fontSize:7},{text:'Pre-revitstas',fontSize:7},{text:'TOTAL/UNIDADES\n ATENDIDAS X\n MODALIDAD',fontSize:7}],
            //       [{text:'ss'}, {},{},{},{},{},{}],
                  //  [listaModalidades, [{text:'ss'}, {text:'vcvvc'}],[{text:''+this.taxi , fontSize:8},{text:''+this.urbano,fontsize:8, fontSize:8,border:[true,true,true,true]}],{},{},{},{}]
          //       ]
          //     }
          //  }
            
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

       
      // console.log(dd.content[4].table.body.push([{text:'x'}, {text:'1'},{text:'2'},{text:'3'},{text:'3'},{},{}]));
      
    //console.log(dd.content[3].columns[0]['table']['body'].push([{text:'inteo'}, {text:'1'},{text:'2'},{text:'3'},{text:'3'},{},{}]))
    pdfMake.createPdf(dd).download('actividades.pdf');
    

  }
}
