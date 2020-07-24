import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { Http} from '@angular/http';

@Component({
  selector: 'app-cuadro-exitoso',
  templateUrl: './cuadro-exitoso.component.html',
  styleUrls: ['./cuadro-exitoso.component.css']
})
export class CuadroExitosoComponent implements OnInit {

  constructor(private router:Router,private http:Http, private route:ActivatedRoute) { }

  EoF:boolean;
  ngOnInit() {
    if(this.route.snapshot.paramMap.get('Exito') == "Exito")
    {
      this.EoF = true;
    }
    else
    {

      this.EoF = false;
    }
  }
  navegarInicio()
  {
    this.router.navigate(['']);
    
  }
  
  navegarSesion()
  {

    this.router.navigate(['card'])


  }
  navegarRegistro()
  {
    this.router.navigate(['registro']);
    
  }
  navegarLibreria()
  {
    this.router.navigate(['libreria'])
  }

  navegarPublicidad()
  {
    this.router.navigate(['emd'])
  }
  navegarMusica()
  {
    this.router.navigate(['musica'])
  }

  navegarBusqueda()
  {
    this.router.navigate(['busqueda'])
  }

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

}
