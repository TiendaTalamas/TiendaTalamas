import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { Router, NavigationEnd } from '@angular/router'; 

@Component({
  selector: 'app-contenedor1',
  templateUrl: './contenedor1.component.html',
  styleUrls: ['./contenedor1.component.css']
})
export class Contenedor1Component implements OnInit {
  //Variables auxiliares
  CompUsuario:boolean;
  

  nombre: string;
  productoObjeto: producto[];
  LimiteI :string;
  LimiteF :string;
  cadena: string;
  registroForm: FormGroup;
  noRegistrado:boolean;

  
    //Datos Slider
    AA_slider: string;
    data_slider: any[];
    val_slider: any[];
    contenedor_slider: string;
    xxxMap_slider = new Map();
    valuesKeys_slider = new Array;
    articulosArray_slider = new Array;

  //Datos Articulos mas Vendidos
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;

  //Datos Ofertas
  AA_Ofertas: string;
  data_Ofertas: any[];
  val_Ofertas: any[];
  contenedor_Ofertas: string;
  xxxMap_Ofertas = new Map();
  valuesKeys_Ofertas = new Array;
  articulosArray_Ofertas = new Array;

  //datos recientes
   AA_Recientes_Libros: string;
   data_Recientes_Libros: any[];
   val_Recientes_Libros: any[];
   contenedor_Recientes_Libros: string;
   xxxMap_Recientes_Libros = new Map();
   valuesKeys_Recientes_Libros = new Array;
   articulosArray_Recientes_Libros = new Array;

   //Datos Recomendados
    AA_Recomendados: string;
    data_Recomendados: any[];
    val_Recomendados: any[];
    contenedor_Recomendados: string;
    xxxMap_Recomendados = new Map();
    valuesKeys_Recomendados = new Array;
    articulosArray_Recomendados = new Array;

    //Arrays para libros
    articulosArray_Recientes_Libros2 = new Array;
    articulosArray_Recientes_Libros3 = new Array;

    //Arrays para Instrumentos
    articulosArray_Vendidos_Instrumentos = new Array;
    articulosArray_Vendidos_Instrumentos2 = new Array;
    articulosArray_Vendidos_Instrumentos3 = new Array;

    //datos Celualar
   AA_Celualar: string;
   data_Celular: any[];
   val_Celular: any[];
   contenedor_Celular: string;
   xxxMap_Celular = new Map();
   valuesKeys_Celular = new Array;
   articulosArray_Celular = new Array;

   //datos libros vendidos
   articulosArray_Vendidos_Libros = new Array;
   articulosArray_Vendidos_Libros2 = new Array;
   articulosArray_Vendidos_Libros3 = new Array;
   articulosArray_Vendidos_Libros4 = new Array;
   articulosArray_Vendidos_Libros5 = new Array;
   articulosArray_Vendidos_Libros6 = new Array;


   masVendido = new Array;
   masVendidosCelular = new Array;


   articulosArray_Vendidos_Discos = new Array;
   articulosArray_Vendidos_Discos2 = new Array;
   articulosArray_Vendidos_Discos3 = new Array;
   articulosArray_Vendidos_Discos4 = new Array;
   articulosArray_Vendidos_Discos5 = new Array;
   articulosArray_Vendidos_Discos6 = new Array;
   //Para el modal
   respuesta:string;
   









  constructor(private http: Http,private router: Router,private fb: FormBuilder, private location:Location,
    public _servicioCompartido : servicioCompartido){   
       this.registroForm = fb.group({
         'cadena' : this.cadena

    });}


  ngOnInit() {
    this._servicioCompartido.obtenerCantidadCarrito();
    this.router.events.subscribe((evt) => { 
      if (!(evt instanceof NavigationEnd)) { 
       return; 
      } 

      window.scrollTo(0, 0) 
     });
    
     this.masVendidosCel();
    //Productos Libros
    this.LimiteI = "0";
    this.obtenerVendidos();
    this.obtenerRecientes();
    this.discosMasVendidos();
    this.LimiteI = "6";
    this.obtenerRecientes();
    this.obtenerVendidos();
    this.discosMasVendidos();
    this.LimiteI = "12";
    this.obtenerRecientes();
    this.obtenerVendidos();
    this.obtenerLibrosCelular();
    this.discosMasVendidos();
    this.LimiteI = "18";
    this.obtenerRecientes();
    this.obtenerVendidos();
    this.obtenerLibrosCelular();
    this.discosMasVendidos();
    this.LimiteI = "24";
    this.obtenerRecientes();
    this.obtenerVendidos();
    this.obtenerLibrosCelular();
    this.LimiteI = "30";
    this.obtenerRecientes();
    this.obtenerVendidos();
    this.obtenerLibrosCelular();

    





    this.obtenerSlider();
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
  
  discosMasVendidos()
  {
    if(this.LimiteI == "0")
    {
    let body = new URLSearchParams();
    body.append('limiteI',  "0");
    this.http.post(this._servicioCompartido.Url+'/discosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Discos = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }else if(this.LimiteI == "6")
  {
    let body = new URLSearchParams();
    body.append('limiteI',"6");
    this.http.post(this._servicioCompartido.Url+'/discosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Discos2 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }
  else if(this.LimiteI == "12")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "12");
    this.http.post(this._servicioCompartido.Url+'/discosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Discos3 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }
  else if(this.LimiteI == "18")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "18");
    this.http.post(this._servicioCompartido.Url+'/discosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Discos4 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }
  }

   //Metodo para obtener recientes
   masVendidosCel(){
    let body = new URLSearchParams();
    body.append('limiteI', "0");
    body.append('limiteS', "1");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.masVendido = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
    body.append('limiteI', "1");
    body.append('limiteS', "17");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            this.masVendidosCelular = result;
            console.log(this.masVendidosCelular);
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
   }
  obtenerVendidos() {
    if(this.LimiteI == "0")
    {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }else if(this.LimiteI == "6")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros2 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }
  else if(this.LimiteI == "12")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros3 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }
  else if(this.LimiteI == "18")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "0");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros4 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }
  else if(this.LimiteI == "24")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "6");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros5 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }
  else if(this.LimiteI == "30")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "12");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros6 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }

  }
  obtenerRecientes() {
    if(this.LimiteI == "0")
    {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroReciente.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Recientes_Libros = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }else if(this.LimiteI == "6")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroReciente.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Recientes_Libros2 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }
  else if(this.LimiteI == "12")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroReciente.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Recientes_Libros3 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }
  

  }

  obtenerLibrosCelular()
  {
    let body = new URLSearchParams();
    this.http.post(this._servicioCompartido+'/obtenerLibroCelular.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Celualar = "";
            this.data_Celular = [];
            console.log(result);
            this.articulosArray_Celular = result;
            for (var key in result) {
            this.AA_Celualar = this.AA_Celualar + key;
            if (result.hasOwnProperty(key)) {
              this.val_Celular = result[key];
              this.data_Celular.push(Object.keys(this.val_Celular));
              for (var i = 0; i < Object.keys(this.val_Celular).length; i++) {
              this.contenedor_Celular = Object.keys(this.val_Celular)[i];
              Object.entries(this.val_Celular)[i]
               
                this.xxxMap_Celular.set(Object.keys(this.val_Celular)[i], Object.values(this.val_Celular)[i]);
                this.valuesKeys_Celular.push(Object.keys(this.val_Celular)[i], Object.values(this.val_Celular)[i]);

                }
             }
          }
    });

  }



  masInformacion(IdProducto: string, Categoria: string){
    this.nombre = IdProducto;
    console.log(this.nombre);
    this.router.navigate(['venta',Categoria,IdProducto]);


   }

   //Obteniendo datos
   obtenerSlider() {
    let body = new URLSearchParams();
    this.http.post(this._servicioCompartido.Url+'/slider.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_slider = "";
            this.data_slider = [];
            console.log(result);
            this.articulosArray_slider = result;
            for (var key in result) {
            this.AA = this.AA_slider + key;
            if (result.hasOwnProperty(key)) {
              this.val_slider = result[key];
              this.data_slider.push(Object.keys(this.val_slider));
              for (var i = 0; i < Object.keys(this.val_slider).length; i++) {
              this.contenedor = Object.keys(this.val_slider)[i];
              Object.entries(this.val_slider)[i]
               
                this.xxxMap_slider.set(Object.keys(this.val_slider)[i], Object.values(this.val_slider)[i]);
                this.valuesKeys_slider.push(Object.keys(this.val_slider)[i], Object.values(this.val_slider)[i]);

                }
             }
          }
    });
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
    this.router.navigate(['libreria']);
  }
  
  navegarImprenta()
  {
    this.router.navigate(['Imprenta']);
  }
  navegarJuegos()
  {
    this.router.navigate(['Juegos']);
  }
  navegarAcrilicos()
  {
    this.router.navigate(['Acrilicos']);
  }
  navegarPublicidad()
  {
    this.router.navigate(['emd']);
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
  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
  }
  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }


  

  
  anadirAlCarrito(IdProducto:string)
  {
    let body = new URLSearchParams();
    body.append("IdProducto",IdProducto);
    body.append("Cantidad", "1");
    body.append("token",localStorage.getItem('Token'))
    
    this.http.post(this._servicioCompartido.Url+'/agregarCarrito.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
            {
              this.respuesta=result;
              if(this.respuesta == "Iniciar sesion o registrarse para agregar al carrito")
              {
                this.noRegistrado= true;
              }else{
                this.noRegistrado = false;
                this._servicioCompartido.obtenerCantidadCarrito();
              }
              console.log(result);
    });

  }
}


