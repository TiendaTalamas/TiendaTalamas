import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-emd',
  templateUrl: './emd.component.html',
  styleUrls: ['./emd.component.css']
})
export class EMDComponent implements OnInit {
registroForm:FormGroup;
cadena:string;
  constructor(private http: Http,private router: Router, private location:Location,
    public _servicioCompartido : servicioCompartido, private fb:FormBuilder){   
      this.registroForm = fb.group({
        'cadena' : this.cadena

   });}

  ngOnInit() {
    this._servicioCompartido.comprobarUsuario();

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
    this._servicioCompartido.setCadena(this.cadena);
    console.log(this.cadena);
    this.router.navigate(['busqueda'])
  }

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

}
