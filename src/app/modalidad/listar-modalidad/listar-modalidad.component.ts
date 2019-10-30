import { Component, OnInit } from '@angular/core';

// Models
import { Modalidad } from '../../shared/models/modalidad';

// Services
import { CatalogoService} from '../../catalogo/catalogo.service'
declare var M; 

@Component({
  selector: 'app-listar-modalidad',
  templateUrl: './listar-modalidad.component.html',
  styleUrls: ['./listar-modalidad.component.css']
})
export class ListarModalidadComponent implements OnInit {
  public filtro: string;
  public modalidades: Array<Modalidad>;
  public modalidad: any;
  slide: any; 

  constructor(private service?: CatalogoService) { }

  ngOnInit() {  
    let elems; 
    this.service.getModalidades().subscribe(({data}) => {
      this.modalidades = data['modalidades'];      
    });
   
    
    this.slide = document.querySelector('.slide');  
    console.log(this.slide);
    
  }

  onKey(e) {
    if (e.keyCode == 13) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
    }
  }


  clickHandler() {
    this.slide.classList.toggle('opened');
    this.slide.classList.toggle('closed');
  }
  
}
