import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Http, Response } from '@angular/http';
import { servicioCompartido } from '../../../servicios/servicioCompartido';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent implements OnInit {

  constructor(private http: Http,private router: Router,public _servicioCompartido : servicioCompartido) { }

  ngOnInit() {
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
    this.router.navigate(['musica']);

  }

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }

  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }

}
