import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { servicioCompartido } from './servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  Pag1:boolean;
  cadena: string;
  registroForm:FormGroup;

  constructor(private router: Router, private location:Location,private http: Http, public _servicioCompartido:servicioCompartido, private fb:FormBuilder){
    this.registroForm = fb.group({
      'cadena' : this.cadena

 });
  }
  ngOnInit()
  {

    this._servicioCompartido.comprobarUsuario();
    this.obtenerSubCategoriasLibros();
    this.obtenerSubCategoriasInst();
  }
  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;
  articulosArray_Inst = new Array;
  AA_Buscar: string;
  data_Buscar: any[];
  val_Buscar: any[];
  contenedor_Buscar: string;
  xxxMap_Buscar = new Map();
  valuesKeys_Buscar = new Array;
  articulosArray_Buscar = new Array;

  navegarCategoria(Categoria:string, SubCategoria: string){

    console.log(SubCategoria);
    this.router.navigate(['categoria',Categoria,SubCategoria]);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
  }
  obtenerSubCategoriasLibros(){
    
    
    let body2 = new URLSearchParams();
    body2.append('categoria', "Libros");



    this.http.post(this._servicioCompartido.Url+'/obtenerSubCategoria.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            console.log(result);
            this.articulosArray_Sub = result;
            for (var key in result) {
            this.AA_Sub = this.AA_Sub + key;
            if (result.hasOwnProperty(key)) {
              this.val_Sub = result[key];
              this.data_Sub.push(Object.keys(this.val_Sub));
              for (var i = 0; i < Object.keys(this.val_Sub).length; i++) {
              this.contenedor_Sub = Object.keys(this.val_Sub)[i];
              Object.entries(this.val_Sub)[i]
               
                this.xxxMap_Sub.set(Object.keys(this.val_Sub)[i], Object.values(this.val_Sub)[i]);
                this.valuesKeys_Sub.push(Object.keys(this.val_Sub)[i], Object.values(this.val_Sub)[i]);

                }
             }
          }
    });
  }

  obtenerSubCategoriasInst(){
    
    
    let body2 = new URLSearchParams();
    body2.append('categoria', "Instrumentos");



    this.http.post(this._servicioCompartido.Url+'/obtenerSubCategoria.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            console.log(result);
            this.articulosArray_Inst = result;
            for (var key in result) {
            this.AA_Sub = this.AA_Sub + key;
            if (result.hasOwnProperty(key)) {
              this.val_Sub = result[key];
              this.data_Sub.push(Object.keys(this.val_Sub));
              for (var i = 0; i < Object.keys(this.val_Sub).length; i++) {
              this.contenedor_Sub = Object.keys(this.val_Sub)[i];
              Object.entries(this.val_Sub)[i]
               
                this.xxxMap_Sub.set(Object.keys(this.val_Sub)[i], Object.values(this.val_Sub)[i]);
                this.valuesKeys_Sub.push(Object.keys(this.val_Sub)[i], Object.values(this.val_Sub)[i]);

                }
             }
          }
    });
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
  obtenerBusqueda(){
    let body = new URLSearchParams();
    body.append('cadena', this.cadena);
    this.http.post(this._servicioCompartido.Url+'/buscar.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Buscar = "";
            this.data_Buscar = [];
            console.log(result);
            this.articulosArray_Buscar = result;
            for (var key in result) {
            this.AA_Buscar = this.AA_Buscar + key;
            if (result.hasOwnProperty(key)) {
              this.val_Buscar= result[key];
              this.data_Buscar.push(Object.keys(this.val_Buscar));
              for (var i = 0; i < Object.keys(this.val_Buscar).length; i++) {
              this.contenedor_Buscar = Object.keys(this.val_Buscar)[i];
              Object.entries(this.val_Buscar)[i]
               
                this.xxxMap_Buscar.set(Object.keys(this.val_Buscar)[i], Object.values(this.val_Buscar)[i]);
                this.valuesKeys_Buscar.push(Object.keys(this.val_Buscar)[i], Object.values(this.val_Buscar)[i]);

                }
             }
          }
    });

  }
  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }
  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
    this.obtenerBusqueda();
  }
  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }
  navegarInicio()
  {
    this.router.navigate(['']);
    
  }

  navegarSesion()
  {

    this.router.navigate(['card'])


  }

  navegarSoporte()
  {
    this.router.navigate(['soporte'])
  }

  navegarPoliticas(TipoCondicion:string)
  {
    this.router.navigate(['Condiciones', TipoCondicion]);
    if(TipoCondicion == "CondicionesDeUso")
    {
      this._servicioCompartido.Cond1 = true;
      this._servicioCompartido.Cond2 = false;
    }
    else{
      this._servicioCompartido.Cond2 = true;
      this._servicioCompartido.Cond1 = false;
    }

  }
  
 
  title = 'talamas';

}
