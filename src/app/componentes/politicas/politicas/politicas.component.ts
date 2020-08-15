import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import { servicioCompartido } from '../../../servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent implements OnInit {
  CompUsuario:boolean;
  cadena:string;
  registroForm:FormGroup;
  TipoCondiciones:string;
  Cond1:boolean;
  Cond2:boolean;
  constructor(private http: Http,private router: Router, public _servicioCompartido : servicioCompartido, private route:ActivatedRoute) { }

  ngOnInit() {
    this._servicioCompartido.comprobarUsuario();
    this.TipoCondiciones = this.route.snapshot.paramMap.get('uso');
    if(this.TipoCondiciones == "CondicionesDeUso")
    {
      this.Cond1 = true;
    }
    else{
      this.Cond2 = true;
    }
  }

  navegarInicio()
  {
    this.router.navigate(['']);
    
  }
  articulosArray_Sub = new Array;

  navegarCategoria(Categoria:string, SubCategoria: string){

    console.log(SubCategoria);
    this.router.navigate(['categoria',Categoria,SubCategoria]);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
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
  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
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
