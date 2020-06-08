import { Component, OnInit, Input } from '@angular/core';
//Importando los servicios para obtener los datos del producto
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-venta-libro',
  templateUrl: './venta-libro.component.html',
  styleUrls: ['./venta-libro.component.css']
})

export class VentaLibroComponent implements OnInit {
  Nombre: string;
  Categoria: string;
  IdProducto: string;
  limiteI: string;
  P1: boolean;
  P2: boolean;
  P3: boolean;
  P4: boolean; 

  //Variables para formulario 
  DatosError:boolean = false;
  cadena: string;
  ventaForm: FormGroup;
  ventaforma: FormGroup;
  email: string;
  nombre: string;
  apellido: string;
  calle1: string;
  calle2: string;
  calle3: string;
  ciudad: string;
  cantidad:string;
  precioBinding:number = 123;
  precio:number;
  cantidades = [1, 2, 3];

  //array para guardar los valores

  constructor(private _servicioCompartido : servicioCompartido,private router:Router,private http:Http,private fb: FormBuilder,fb2: FormBuilder,){ 
  this.ventaForm = fb.group({
    'email' : [null, Validators.required],
    'nombre': this.nombre,
    'apellido': this.apellido,  
    'calle1': this.calle1,
    'calle2': this.calle2,
    'calle3': this.calle3,
    'ciudad': this.ciudad,
    'cantidad': this.cantidad,
    'precioBinding': this.precioBinding,
    'precio': this.precio
  });
this.ventaforma = fb2.group({
  'cadena': this.cadena
});
}






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
    console.log(this.precioBinding + " ESTE ES EL VALOR");
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
    
    this.defaultPrice();
    

  }
//Metodo de obtencion de un libro aleatorio para optimizar las pruebas
  LibroAleatorio() {
    let body = new URLSearchParams();
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/libroAleatorio.php', body)
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
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerCarruselVenta.php', body)
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
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerCarruselVenta.php', body)
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
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerCarruselVenta.php', body)
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


    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerUnicoArticulo.php', body)
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

  
  masInformacion(IdProducto: string, Categoria: string){
    this.Nombre = IdProducto;
    console.log(this.Nombre);
    this._servicioCompartido.setIdProducto(IdProducto);
    this._servicioCompartido.setCategoria(Categoria);
    this.Categoria = this._servicioCompartido.getCategoria();
    this.IdProducto = this._servicioCompartido.getIdProducto();  
    this.obtenerArticulo();


  }
/*
  onChange()
  {
    console.log(this.cantidad + " ESTA ES LA CANTIDAD");
    for(let producto of this.productos)
    {
    this.precio=producto.Precio;
    }

    //this.precioBinding = this.precio * this.cantidad;
    console.log(this.precioBinding);
    

  }
*/
  onChange(cantidad) {
    for(let producto of this.productos)
    {
    this.precio=producto.Precio;
    }
    this.precioBinding = this.precio * cantidad;
    console.log(this.precioBinding);
    // ... do other stuff here ...
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
    this.router.navigate(['busqueda'])
  }

  venta()
  {
   // let body = new URLSearchParams();
   // body.append('nombre', this.nombre);
   // body.append('email', this.email);
    //body.append('apellido', this.apellido);
    //body.append('calle1', this.calle1);
    //body.append('calle2', this.calle2);
    //body.append('calle3', this.calle3);
    //body.append('ciudad', this.ciudad);

    console.log(this.nombre);
      console.log(this.email);
      console.log(this.apellido);
      console.log(this.calle1);
      console.log(this.calle2);
      console.log(this.calle3);
      console.log(this.ciudad);
      console.log(this.cantidad)
      
  }

  defaultPrice(){
    console.log("Dentro del metodo defaultPrice");
    for(let producto of this.productos)
    {
        this.precio=producto.Precio;
        
    }
    this.precioBinding = this.precio;
  }

  openModal(){
    for(let producto of this.productos)
    {
    this.precioBinding=producto.Precio;
    }
  }

}
