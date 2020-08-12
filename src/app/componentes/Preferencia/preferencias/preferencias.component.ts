import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent implements OnInit {

  constructor(private http: Http,private router: Router, public _servicioCompartido) { }

  ngOnInit() {
    this._servicioCompartido.comprobarUsuario();
  }
  navegarInicio()
  {
    this.router.navigate(['']);
    
  }
  navegarMusica()
  {
    this.router.navigate(['musica'])
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
  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

}
