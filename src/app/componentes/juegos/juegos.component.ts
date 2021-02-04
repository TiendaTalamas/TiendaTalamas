import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http,Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  constructor(private router:Router, private http:Http, private _servicioCompartido:servicioCompartido) { }

  ngOnInit() {
    this.obtenerPaginas();
    this.obtenerArticulos();
    this.obtenerSubCategoriasLibros();
    this.sub="Elegir Categoria";
  }
  
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;
  respuesta:string;
  noRegistrado:boolean;
  articulosArray_Sub = new Array;
  sub:string;
  paginas:number;
  paginaActual:number;
  SubCategoria:string;
  obtenerSubCategoriasLibros(){
    
    
    let body2 = new URLSearchParams();
    body2.append('categoria', "EMD");



    this.http.post(this._servicioCompartido.Url+'/obtenerEmd.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {

            this.articulosArray_Sub = result;
          
    });
  }
  onChange(SubCategoria:string) {
    this.obtenerArticulosEspecificos(SubCategoria)
  }

  obtenerPaginas(){
    let body2 = new URLSearchParams();
    this.paginaActual = 1;
    body2.append("SubCategoria",this.SubCategoria),
    this.http.post(this._servicioCompartido.Url+'/obtenerPaginasJuegos.php', body2)
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

  }  obtenerArticulos() {
    let body = new URLSearchParams();
    body.append('limite', String(this.paginaActual));
    body.append('SubCategoria', this.SubCategoria);
    this.http.post(this._servicioCompartido.Url+'/juegosDi.php', body)
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

  obtenerArticulosEspecificos(propiedad:string) {
    this.SubCategoria = propiedad;
    this.obtenerPaginas();
    this.obtenerArticulos();
  }



  navegarLibreria()
  {
    this.router.navigate(['libreria']);
  }

  navegarSesion()
  {

    this.router.navigate(['card'])


  }

  navegarMusica()
  {
    this.router.navigate(['musica']);
  }


  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.router.navigate(['venta',Categoria,IdProducto,Nombre]);


   }
   
}
