import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgFallimgModule } from 'ng-fallimg';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css']
})
export class LibreriaComponent implements OnInit {
  cadena: string;
  registroForm: FormGroup;

  Categoria: string;
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;
  productoObjeto: producto[];
  nombre: string;
  sub:string;
  //Aleatorio
  AA_Recomendados: string;
  data_Recomendados: any[];
  val_Recomendados: any[];
  contenedor_Recomendados: string;
  xxxMap_Recomendados = new Map();
  valuesKeys_Recomendados = new Array;
  articulosArray_Recomendados = new Array;
  noRegistrado:boolean;
  ocultar:boolean;
  paginas:number;
  paginaActual:number;
  //Variable del modal
  respuesta:string;
  SubCategoria:string;

  
  //Constructor
  constructor(private http: Http,private router: Router, private location:Location,
    public _servicioCompartido : servicioCompartido, fb : FormBuilder, public falla:NgFallimgModule) {   
      this.registroForm = fb.group({
        'cadena' : this.cadena

   });}
 
  obtenerArticulos() {
    let body = new URLSearchParams();
    body.append("limite",String(this.paginaActual));
    body.append("SubCategoria",this.SubCategoria);
    this.http.post(this._servicioCompartido.Url+'/librosRomance.php', body)
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
  obtenerArticulosEspecificos(SubCat:string) {
    this.SubCategoria = SubCat;
    this.obtenerPaginas();
    this.obtenerArticulos();
  }

  obtenerRecomendados() {
    let body = new URLSearchParams();
    this.http.post(this._servicioCompartido.Url+'/libroAleatorio.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recomendados = "";
            this.data_Recomendados = [];
            this.articulosArray_Recomendados = result;
            for (var key in result) {
            this.AA_Recomendados = this.AA_Recomendados + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recomendados = result[key];
              this.data_Recomendados.push(Object.keys(this.val_Recomendados));
              for (var i = 0; i < Object.keys(this.val_Recomendados).length; i++) {
              this.contenedor = Object.keys(this.val_Recomendados)[i];
              Object.entries(this.val_Recomendados)[i]
               
                this.xxxMap_Recomendados.set(Object.keys(this.val_Recomendados)[i], Object.values(this.val_Recomendados)[i]);
                this.valuesKeys_Recomendados.push(Object.keys(this.val_Recomendados)[i], Object.values(this.val_Recomendados)[i]);

                }
             }
          }
    });
  }
  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;
  articulosArray_Sub2 = new Array;
  articulosArray_Inst = new Array;
  pag = new Array;

  obtenerPaginas(){
    let body2 = new URLSearchParams();
    this.paginaActual = 1;
    body2.append("SubCategoria",this.SubCategoria),
    this.http.post(this._servicioCompartido.Url+'/obtenerPaginasLibreria.php', body2)
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
            this.articulosArray_Sub = result;
    });
    body2.append('categoria', "Libros");
    body2.append('limiteI', "6");
    body2.append('limiteS', "100");

    this.http.post(this._servicioCompartido.Url+'/obtenerSubCategoria.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
            this.articulosArray_Sub2 = result;
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
  onChange(SubCategoria:string) {
    this.obtenerArticulosEspecificos(SubCategoria);
}

  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.nombre = IdProducto;
    this.router.navigate(['venta',Categoria,IdProducto, Nombre]);
  }

  navegarCategoria(Categoria:string, SubCategoria: string){
    this.Categoria = Categoria;
    alert(Categoria);
    this.router.navigate(['categoria',Categoria,SubCategoria]);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
  }
  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
  }
  ngOnInit() {
    this.ocultar = true;
    this._servicioCompartido.comprobarUsuario();
    this.Categoria = "Libros";
    this.obtenerPaginas();
    this.paginaActual = 1;
    this.obtenerArticulos();
    this.obtenerSubCategoriasLibros();
    this.obtenerSubCategoriasInst();
    this.sub="Elegir Categoria";
  }
  mostrarYOcultar()
  {
    this.ocultar = !this.ocultar;
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

  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }

  navegarLibreria()
  {
    this.router.navigate(['libreria'])
  }

  navegarPublicidad()
  {
    this.router.navigate(['emd'])
  }

  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  navegarJuegos()
  {
    this.router.navigate(['Juegos']);
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
    });

  }


}
