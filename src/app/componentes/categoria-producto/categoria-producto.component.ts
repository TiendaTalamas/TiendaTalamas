import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import 'rxjs/add/operator/map';
import { URLSearchParams } from "@angular/http";
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { FormGroup, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent implements OnInit {
  nombre: string;
  cadena: string;
  registroForm: FormGroup;

  constructor(private http: Http,private router: Router, private location:Location,
    public _servicioCompartido : servicioCompartido, private fb:FormBuilder, private Route:ActivatedRoute) {   
      this.registroForm = fb.group({
        'cadena' : this.cadena

   });}
  productoObjeto : producto[];
  Logo : string;
    
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
  articulosArray_Lib = new Array;
  articulosArray_Cuer = new Array;
  articulosArray_Vien = new Array;
  articulosArray_Perc = new Array;
  articulosArray_Elec = new Array;
  articulosArray_Disc = new Array;

  Libros:boolean;
  Instrumentos:boolean;
  Viento:boolean;
  Cuerda:boolean;
  Percusion:boolean;
  Electronicos:boolean;
  LibrosCat:boolean;
  ngOnInit() {
    this.obtenerCategoriaDiscos();
    this.obtenerCategoriaLibros();
    this.obtenerCategoraVient();
    this.obtenerCategoraCuer();
    this.obtenerCategoraPerc();
    this.obtenerCategoraElec();
    this.Libros = true;
    this.Instrumentos = false;
    this._servicioCompartido.comprobarUsuario();
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.SubCategoria = this.Route.snapshot.paramMap.get('subcategoria');
    if(this.Categoria == "Instrumentos")
    {
      this.Logo = "assets/libreriaLogo.jpg";

    }else{
      this.Logo = "assets/logoLibreria.jpg";

    }


    

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
  abrirLibros()
  {
    this.LibrosCat = !this.LibrosCat;
    this.Instrumentos = false;
  }
  abrirInstrumentos()
  {
    if(!this.Instrumentos){
    this.Instrumentos = !this.Instrumentos;
    this.Libros = false;
    }
  }
  abrirElectronico()
  {
    this.Electronicos = !this.Electronicos;
  }
  abrirViento(){
    this.Viento = !this.Viento;
  }
  abrirCuerdas()
  {
    this.Cuerda = !this.Cuerda;
  }
  abrirPercusion()
  {
    this.Percusion = !this.Percusion;
  }
  abrirLibreria()
  {
    if(this.Instrumentos)
    {
    this.LibrosCat = true;
    this.Libros = !this.Libros;
    this.Instrumentos = false;
    }
  }
  obtenerTodos(){

    let body = new URLSearchParams();

      


    this.http.post(this._servicioCompartido.Url+'/todos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
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

    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.SubCategoria = this.Route.snapshot.paramMap.get('subcategoria');
    
    let body = new URLSearchParams();
      
    body.append('categoria', this.Categoria);
    body.append('sub_categoria', this.SubCategoria);

    this.http.post(this._servicioCompartido.Url+'/categoria.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];

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

  
  obtenerArticulos2(cat:string, sub:string){

    this.Categoria = cat;
    this.SubCategoria = sub;
    
    let body = new URLSearchParams();
      
    body.append('categoria', this.Categoria);
    body.append('sub_categoria', this.SubCategoria);

    this.http.post(this._servicioCompartido.Url+'/categoria.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
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
  obtenerCategoriaLibros()
  {
    let body = new URLSearchParams();
    body.append('categoria',"LIBROS");


    this.http.post(this._servicioCompartido.Url+'/obtenerSubCategoria.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Lib = result;
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
  obtenerCategoraVient()
  {
    let body = new URLSearchParams();
    body.append('categoria',"Instrumentos");
    body.append('clase',"Viento");

    this.http.post(this._servicioCompartido.Url+'/obtenerInstrumentosClase.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Vien = result;
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
  obtenerCategoraCuer()
  {
    let body = new URLSearchParams();
    body.append('categoria',"Instrumentos");
    body.append('clase',"Cuerda");

    this.http.post(this._servicioCompartido.Url+'/obtenerInstrumentosClase.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Cuer = result;
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
  obtenerCategoraPerc()
  {
    let body = new URLSearchParams();
    body.append('categoria',"Instrumentos");
    body.append('clase',"Percusion");

    this.http.post(this._servicioCompartido.Url+'/obtenerInstrumentosClase.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Perc = result;
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
  obtenerCategoraElec()
  {
    let body = new URLSearchParams();
    body.append('categoria',"Instrumentos");
    body.append('clase',"Viento");

    this.http.post(this._servicioCompartido.Url+'/obtenerInstrumentosClase.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Elec = result;
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
  obtenerCategoriaDiscos()
  {
    let body = new URLSearchParams();
    body.append('categoria',"Discos");

    this.http.post(this._servicioCompartido.Url+'/obtenerSubCategoria.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Elec = result;
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
  obtenerCategoria(){

    let body = new URLSearchParams();
    body.append('categoria', this.Categoria);

      


    this.http.post(this._servicioCompartido.Url+'/obtenerCategoriaEspecifica.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
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

  obtenerCategoria2(cat:string){

    let body = new URLSearchParams();
    body.append('categoria', cat);

      


    this.http.post(this._servicioCompartido.Url+'/obtenerCategoriaEspecifica.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
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
    
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.SubCategoria = this.Route.snapshot.paramMap.get('subcategoria');
    let body2 = new URLSearchParams();
    body2.append('categoria', this.Categoria);



    this.http.post(this._servicioCompartido.Url+'/obtenerSubCategoria.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
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

  navegarCategoria(Categoria:string, SubCategoria: string){
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.router.navigate(['categoria',Categoria,SubCategoria]);

    if(Categoria == "Instrumentos")
    {
      this.Logo = "assets/libreriaLogo.jpg";

    
    }else{
      this.Logo = "assets/logoLibreria.jpg";

    }
    if(Categoria == "Libros" && SubCategoria == "")
    {
    this.obtenerCategoria2(Categoria);
    this.obtenerSubCategorias();
    }
    else if(Categoria == "Instrumentos" && SubCategoria == "")
    {
     this.obtenerCategoria2(Categoria);
     this.obtenerSubCategorias();
    }
    else{
      this.obtenerArticulos2(Categoria,SubCategoria);
      this.obtenerSubCategorias();
    }
 
  }
  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }


  
  navegarInicio()
  {
    localStorage.setItem('Nombre', 'Miguel Antonio');
    this.router.navigate(['']);
    
  }
  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
  }

  navegarHistorial()
  {
    this.router.navigate(['historial']);
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


  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.router.navigate(['venta',Categoria,IdProducto,Nombre]);


   }

}
