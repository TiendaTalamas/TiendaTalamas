import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { producto } from '../../servicios/producto';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  registroForm: FormGroup;


  constructor(private http: Http,private router: Router, private location:Location,
    public _servicioCompartido : servicioCompartido, private fb:FormBuilder){   
      this.registroForm = fb.group({
        'cadena' : this.cadena
   });}

   productoObjeto : producto[];
   Logo : string;
   nombre: string;

   Categoria : string;
   SubCategoria: string;
   AA: string;
   data: any[];
   val: any[];
   contenedor: string;
   xxxMap = new Map();
   valuesKeys = new Array;
   articulosArray = new Array;
 
   AA_Sub: string;
   data_Sub: any[];
   val_Sub: any[];
   contenedor_Sub: string;
   xxxMap_Sub = new Map();
   valuesKeys_Sub = new Array;
   articulosArray_Sub = new Array;
   //Esto de arriba es para las categorias 

    cadena: string;
    AA_Buscar: string;
    data_Buscar: any[];
    val_Buscar: any[];
    contenedor_Buscar: string;
    xxxMap_Buscar = new Map();
    valuesKeys_Buscar = new Array;
    articulosArray_Buscar = new Array;
 

  ngOnInit() {
    this._servicioCompartido.comprobarUsuario();
    this.cadena = this._servicioCompartido.getCadena();
    console.log(this.cadena);
    this.obtenerBusqueda();

    this.Categoria = this._servicioCompartido.getCategoria();
    this.SubCategoria = this._servicioCompartido.getSubCategoria();
    if(this.Categoria == "Instrumentos")
    {
      this.Logo = "assets/libreriaLogo.jpg";

    }else{
      this.Logo = "assets/logoLibreria.jpg";

    }


    
    console.log(this.Categoria);
    console.log(this.SubCategoria);
    if(this.Categoria === undefined){
      this.obtenerTodos();

    }
    else if(this.Categoria == "Libros" && this.SubCategoria === "")
    {
    this.obtenerCategoria()
    this.obtenerSubCategorias();
    }
    else if( this.Categoria == "Instrumentos" && this.SubCategoria === "")
    {
     this.obtenerCategoria();
     this.obtenerSubCategorias();
    }
    else{
      this.obtenerArticulos();
      this.obtenerSubCategorias();
    }

  }

  obtenerTodos(){

    let body = new URLSearchParams();

      


    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/todos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
            console.log(result);
            this.articulosArray = result;
            for (var key in result) {
            this.AA = this.AA + key;
            if (result.hasOwnProperty(key)) {
              this.val = result[key];
              this.data.push(Object.keys(this.val));
              for (var i = 0; i < Object.keys(this.val).length; i++) {
              this.contenedor = Object.keys(this.val)[i];
              Object.entries(this.val)[i]
               
                this.xxxMap.set(Object.keys(this.val)[i], Object.values(this.val)[i]);
                this.valuesKeys.push(Object.keys(this.val)[i], Object.values(this.val)[i]);

                }
             }
          }
    });

  }

  obtenerArticulos(){
    this.Categoria = this._servicioCompartido.getCategoria();
    this.SubCategoria = this._servicioCompartido.getSubCategoria();
    let body = new URLSearchParams();
      
    body.append('categoria', this.Categoria);
    body.append('sub_categoria', this.SubCategoria);

    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/categoria.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
            console.log(result);
            this.articulosArray = result;
            for (var key in result) {
            this.AA = this.AA + key;
            if (result.hasOwnProperty(key)) {
              this.val = result[key];
              this.data.push(Object.keys(this.val));
              for (var i = 0; i < Object.keys(this.val).length; i++) {
              this.contenedor = Object.keys(this.val)[i];
              Object.entries(this.val)[i]
               
                this.xxxMap.set(Object.keys(this.val)[i], Object.values(this.val)[i]);
                this.valuesKeys.push(Object.keys(this.val)[i], Object.values(this.val)[i]);

                }
             }
          }
    });

  }

  masInformacion(IdProducto: string, Categoria: string){
    this.nombre = IdProducto;
    console.log(this.nombre);
    this.router.navigate(['venta']);
    this._servicioCompartido.setIdProducto(IdProducto);
    this._servicioCompartido.setCategoria(Categoria);

  }

  obtenerCategoria(){

    let body = new URLSearchParams();
    body.append('categoria', this.Categoria);

      


    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerCategoriaEspecifica.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
            console.log(result);
            this.articulosArray = result;
            for (var key in result) {
            this.AA = this.AA + key;
            if (result.hasOwnProperty(key)) {
              this.val = result[key];
              this.data.push(Object.keys(this.val));
              for (var i = 0; i < Object.keys(this.val).length; i++) {
              this.contenedor = Object.keys(this.val)[i];
              Object.entries(this.val)[i]
               
                this.xxxMap.set(Object.keys(this.val)[i], Object.values(this.val)[i]);
                this.valuesKeys.push(Object.keys(this.val)[i], Object.values(this.val)[i]);

                }
             }
          }
    });

  }

  obtenerSubCategorias(){
    
    this.Categoria = this._servicioCompartido.getCategoria();
    this.SubCategoria = this._servicioCompartido.getSubCategoria();
    let body2 = new URLSearchParams();
    body2.append('categoria', this.Categoria);



    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerSubCategoria.php', body2)
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

 



  navegarInicio()
  {
    this.router.navigate(['']);
    
  }
  navegarCategoria(Categoria:string, SubCategoria: string){
    this.Categoria = Categoria;
    console.log(this.Categoria);
    console.log(SubCategoria);
    this._servicioCompartido.setCategoria(Categoria);
    this._servicioCompartido.setSubCategoria(SubCategoria);
    this.router.navigate(['categoria']);}
  
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
    this.cadena = this._servicioCompartido.getCadena();
    console.log(this.cadena);
    this.obtenerBusqueda();
  }

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  obtenerBusqueda(){
    let body = new URLSearchParams();
    body.append('cadena', this.cadena);
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/buscar.php', body)
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

}
