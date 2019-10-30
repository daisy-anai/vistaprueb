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
  private options: Array<{}>;
   public modal : any;

  constructor(private service?: CatalogoService) { }

  ngOnInit() {
    this.service.getModalidades().subscribe(({data}) => {
      this.modalidades = data['modalidades'];
    });
    this.options = [
      {icon: 'list', description: 'Catálogos', urn: `/aplicacion/catalogo/modalidad/${this.modalidad}`},
      {icon: 'list', description: 'Vigencia', urn: `/aplicacion/vigencias/modalidad/`}
    ];

    var elems = document.querySelectorAll('.dropdown-header-options');
    var instances = M.Dropdown.init(elems, {
      alignment: 'left',
      constrainWidth: false,
      coverTrigger: true
    });
  
  }
  onKey(e) {
    if (e.keyCode == 13) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
    }
  }
}
