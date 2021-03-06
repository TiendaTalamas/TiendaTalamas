import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http,Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { NgFallimgModule } from 'ng-fallimg';


@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {
  registroForm: FormGroup;
  cadena:string;
  articulosArray_Vendidos_Libros = new Array;
  articulosArray = new Array;

  
  constructor(private router: Router, public _servicioCompartido: servicioCompartido, private fb: FormBuilder, private http: Http, public falla:NgFallimgModule) {   
    this.registroForm = fb.group({
      'cadena' : this.cadena

 });}
  Categoria : string;
  
  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;
  articulosArray_Inst = new Array;
  articulosArray_Cuerda = new Array;
  articulosArray_Viento = new Array;
  articulosArray_Percusion = new Array;
  articulosArray_Electricos = new Array;
  noRegistrado:boolean;
  respuesta:string;
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  Cuerda:boolean;
  Viento:boolean;
  Percusion:boolean;
  Electricos:boolean;
  SubCategoria:string;
  paginaActual:number;
  paginas:number;
  sub:string;
  obtenerPaginas(){
    let body2 = new URLSearchParams();
    this.paginaActual = 1;
    body2.append("SubCategoria",this.SubCategoria),
    this.http.post(this._servicioCompartido.Url+'/paginasInstrumentos.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
                
            this.paginas = result['NumPaginas'];

    });
  }
  cambiarPagina(pagina:number){
    this.paginaActual = pagina;
    this.obtenerArticulos();
    window.scrollTo(0, 0) 
  }
  siguiente(){
    if (this.paginaActual != this.paginas) {
      this.paginaActual ++;
      this.obtenerArticulos();
      window.scrollTo(0, 0) 

    }
  }
  anterior(){
    if (this.paginaActual != 1) {
      this.paginaActual --;
      this.obtenerArticulos();
      window.scrollTo(0, 0) 

    }
  }
  mayorOIgual(pagina:number):boolean
  {
    if(pagina > this.paginas){
      return false;
    }else{
      return true;
    }
  }
  menorAUno(pagina:number):boolean
  {
    if(pagina < 1){
      return false;
    }else{
      return true;
    }
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
  onChange(SubCategoria:string) {
    this.obtenerArticulosEspecificos(SubCategoria)
  }
  obtenerDiscos(){
   this.SubCategoria = "CDS";
   this.obtenerPaginas();
   this.obtenerArticulos();
  }
  obtenerArticulos() {
    let body = new URLSearchParams();
    body.append("Clase",this.SubCategoria);
    body.append("limite",String(this.paginaActual));
    this.http.post(this._servicioCompartido.Url+'/instrumentos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              this.articulosArray = result;
    });
  }
  obtenerArticulosEspecificos(Clase:string) {
    this.SubCategoria = Clase;
    this.obtenerPaginas();
    this.obtenerArticulos();
  }
  obtenerElectricos(){
    let body2 = new URLSearchParams();
    body2.append('categoria', "Instrumentos");
    body2.append('subcategoria', "Electricos");
    this.http.post(this._servicioCompartido.Url+'/obtenerClases.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Electricos = result;
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
  obtenerPercusion(){
    let body2 = new URLSearchParams();
    body2.append('categoria', "Instrumentos");
    body2.append('subcategoria', "Percusion");
    this.http.post(this._servicioCompartido.Url+'/obtenerClases.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Percusion = result;
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
  obtenerViento(){
    let body2 = new URLSearchParams();
    body2.append('categoria', "Instrumentos");
    body2.append('subcategoria', "Viento");
    this.http.post(this._servicioCompartido.Url+'/obtenerClases.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Viento = result;
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

  obtenerCuerdas(){
    let body2 = new URLSearchParams();
    body2.append('categoria', "Instrumentos");
    body2.append('subcategoria', "Cuerda");
    this.http.post(this._servicioCompartido.Url+'/obtenerClases.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            this.articulosArray_Cuerda = result;
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
    body2.append('subcategoria', "");



    this.http.post(this._servicioCompartido.Url+'/obtenerClases.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
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
  navegarCategoria(Categoria:string, SubCategoria: string){
    this.Categoria = Categoria;

    this.router.navigate(['categoria']);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
  }
  ngOnInit() {
    this._servicioCompartido.comprobarUsuario();
    this.obtenerSubCategoriasLibros();
    this.obtenerCuerdas();
    this.obtenerViento();
    this.obtenerPercusion();
    this.obtenerElectricos();
    this.obtenerPaginas();
    this.obtenerArticulos();
    this.obtenerSubCategoriasInst();
    document.body.scrollTop=0;
    this.Cuerda = false;
    this.Viento = false;
    this.Percusion = false;
    this.Electricos = false;
    this.sub="Elegir Categoria";
  }
  cuerda(){
    this.Cuerda = !this.Cuerda;
  }

  viento(){
    this.Viento = !this.Viento;
  }

  percusion(){
    this.Percusion = !this.Percusion;
  }

  electricos(){
    this.Electricos = !this.Electricos;
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

  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }

  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.router.navigate(['venta',Categoria,IdProducto,Nombre]);


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
               this._servicioCompartido.respuesta=result;
               if(this._servicioCompartido.respuesta == "Iniciar sesion o registrarse para agregar al carrito")
               {
                 this.noRegistrado= true;
               }else{
                 this.noRegistrado = false;
                 this._servicioCompartido.obtenerCantidadCarrito();
               }
     });
 
   }

   navegarJuegos()
  {
    this.router.navigate(['Juegos']);
  }
  navegarMusica()
  {
    this.router.navigate(['musica'])
  }


  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
  }

  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }
}
