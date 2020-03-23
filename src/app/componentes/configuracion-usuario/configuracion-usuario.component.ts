import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {
  cadena: string;
  registroForm: FormGroup;

  constructor(private router: Router, private _servicioCompartido : servicioCompartido, private fb: FormBuilder) { 
    this.registroForm = fb.group({
      'cadena' : this.cadena
    
  });}

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

  navegarBusqueda()
  {
    this._servicioCompartido.setCadena(this.cadena);
    console.log(this.cadena);
    this.router.navigate(['busqueda'])
  }


}
