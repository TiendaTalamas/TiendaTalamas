import { Component, OnInit, Input } from '@angular/core';
//Importando los servicios para obtener los datos del producto
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";


@Component({
  selector: 'app-venta-libro',
  templateUrl: './venta-libro.component.html',
  styleUrls: ['./venta-libro.component.css']
})
export class VentaLibroComponent implements OnInit {
  Categoria: string;
  IdProducto: string;
  limiteI: string;
  P1: boolean;
  P2: boolean;
  P3: boolean;
  P4: boolean;
  //array para guardar los valores

  constructor(private _servicioCompartido : servicioCompartido,private router:Router,private http:Http) { }
  
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  productos = new Array;
  productosCarrousel = new Array;
  productosCarrousel2 = new Array;
  productosCarrousel3 = new Array;




  ngOnInit() {
    this.Categoria = this._servicioCompartido.getCategoria();
    this.IdProducto = this._servicioCompartido.getIdProducto();  
    if(this.IdProducto === undefined){
      this.LibroAleatorio();

    }else{
    this.obtenerArticulo();
    }
    if(this.Categoria === undefined){
    }
    if(this.Categoria == "Libros"){
      this.P1 = true;
    }
    else if(this.Categoria == "Instrumentos"){
      this.P2 = true;
    }
    this.limiteI = "0";
    this.LibroCarrousel();
    this.limiteI = "6";
    this.LibroCarrousel();
    this.limiteI = "12";
    this.LibroCarrousel();




  }
//Metodo de obtencion de un libro aleatorio para optimizar las pruebas
  LibroAleatorio() {
    let body = new URLSearchParams();
    this.http.post('http://192.168.1.99/talamas/libroAleatorio.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result);
            this.productos = result;
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

  LibroCarrousel() {
    let body = new URLSearchParams();
    body.append('categoria', this.Categoria);
    body.append('limiteI', this.limiteI);
    if(this.limiteI == "0"){
    this.http.post('http://192.168.1.99/talamas/obtenerCarruselVenta.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result);
            this.productosCarrousel = result;
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
  if(this.limiteI == "6"){
    this.http.post('http://192.168.1.99/talamas/obtenerCarruselVenta.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result);
            this.productosCarrousel2 = result;
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
  if(this.limiteI == "12"){
    this.http.post('http://192.168.1.99/talamas/obtenerCarruselVenta.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result);
            this.productosCarrousel3 = result;
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
  }
  //Obtiene el libro cuando recibe datos
  obtenerArticulo(){

    let body = new URLSearchParams();
      
    body.append('id_producto', this.IdProducto);


    this.http.post('http://192.168.1.99/talamas/obtenerUnicoArticulo.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
            this.productos = result;
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

}
