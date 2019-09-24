import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from "../../shared/services/storage.service";
import { User } from "../../shared/models/user";
import { ListarPlantillaComponent } from  '../listarPlantilla/listarPlantilla.component';

declare var M: any;

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {
  public user: User;
  cambio: boolean=true;
  public ListarPlantillaComponent:ListarPlantillaComponent;
  constructor(
    private router?: Router,
    private session?: StorageService
  ) {}

  ngOnInit() {
    this.user = this.session.getCurrentUser();

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      coverTrigger: false
    });

    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
  }

  logout(): void{
    this.session.logout();
    this.router.navigate(['/login']);
  }

  

  
  //cambia al componente lista
  listacambio(){
    this.cambio=false;
    ListarPlantillaComponent;
    this.ListarPlantillaComponent;
    console.log(ListarPlantillaComponent);
  }
  // REPORTES
  archivo(file: File) {
    var reader = new FileReader();
    reader.onload = () => {
      //  console.log(reader.result);
    };
    reader.readAsText(file);
  }
}
