import { Component, OnInit, Input } from '@angular/core';
//Importando los servicios para obtener los datos del producto
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { importType, IfStmt } from '@angular/compiler/src/output/output_ast';


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
  direccionesArray = new Array;
  Nombrecito: string;
  Apellidito:string;
  Correito:string;
  NumeroExterior:string;
  CodigoPostal:string;
  Tipo: boolean;
  Imagen: string;
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
  precioBinding:number;
  Unidades:string;
  precio:number;
  cantidades = [1, 2, 3];
  numeroCelular:string;
  articulosArray_Sub = new Array;
  quantity:string;
  //array para guardar los valores

  constructor(public _servicioCompartido : servicioCompartido,private router:Router,private http:Http,private fb: FormBuilder,fb2: FormBuilder,private Route:ActivatedRoute,){ 
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
    'precio': this.precio,
    'NumeroExterior': this.NumeroExterior,
    'CodigoPostal': this.CodigoPostal,
    'numeroCelular': this.numeroCelular
  });
this.ventaforma = fb2.group({
  'cadena': this.cadena
});
this.formCantidad = fb.group({
'quantity' : this.quantity
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
  imagenesInstrumentos = new Array;
  user:string;
  verificacionProductos:boolean;
  formCantidad:FormGroup;


  ngOnInit() {
    this.quantity = "1";
    this.verificacionProductos = true;
    this.Nombrecito = localStorage.getItem("Nombre_U");
    this.Apellidito = localStorage.getItem("ApellidoPa_U");
    this.Correito = localStorage.getItem("email_U");
    this.IdProducto = this.Route.snapshot.paramMap.get('id');
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    
    this.user = localStorage.getItem("Token");
    
    console.log(this.precioBinding + " ESTE ES EL VALOR");
    this.obtenerArticulo();

    if(this.Categoria === undefined){
    }
    if(this.Categoria == "Libros"){
      this.P1 = true;
    }
    else if(this.Categoria == "Instrumentos"){
      this.P2 = true;
      console.log("Antes de la trajedia");
      this.obtenerImagenes();
    }else if(this.Categoria == "Discos"){
      this.P3 = true;
    }

    this.limiteI = "0";
    this.LibroCarrousel();
    this.limiteI = "6";
    this.LibroCarrousel();
    this.limiteI = "12";
    this.LibroCarrousel();
    
    this.defaultPrice();
    this.obtenerDirecciones();


  }

  obtenerImagenes() {
    let body = new URLSearchParams();
    body.append("IdProducto", this.IdProducto);
    this.http.post(this._servicioCompartido.Url+'/obtenerImagenesInstrumentos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result);
            this.imagenesInstrumentos = result;
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

  obtenerDirecciones() {
    let body = new URLSearchParams();
    body.append('email', localStorage.getItem('email_U'));
    this.http.post(this._servicioCompartido.Url+'/obtenerDirecciones.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result);
            this.direccionesArray = result;
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

//Metodo de obtencion de un libro aleatorio para optimizar las pruebas
  LibroAleatorio() {
    let body = new URLSearchParams();
    this.http.post(this._servicioCompartido.Url+'/libroAleatorio.php', body)
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

  ComprarPorCorreo() {
    let body = new URLSearchParams();
    body.append("IdProducto", this.IdProducto);
    body.append('nombre', this.nombre);
    body.append('numeroCelular', this.numeroCelular);
    body.append('email', this.email);
    body.append('apellido', this.apellido);
    body.append('calle1', this.calle1);
    body.append('calle2', this.calle2);
    body.append('calle3', this.calle3);
    body.append('ciudad', this.ciudad);
    body.append("cantidad",this.cantidad);
    body.append("numeroExterior", this.NumeroExterior);
    body.append("codigoPostal", this.CodigoPostal);
    console.log(this.calle1);
    this.http.post(this._servicioCompartido.Url+'/enviarCorreo.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
            {
              if(result == "Message has been sent")
              {
                alert("Mensaje enviado, en unos instantes recibira un mensaje en su whatsapp");
                console.log(this.numeroCelular);
              }
              else{
                alert(result);
              }
    });
  }

  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
  }

  LibroCarrousel() {
    let body = new URLSearchParams();
    body.append('categoria', this.Categoria);
    body.append('limiteI', this.limiteI);
    if(this.limiteI == "0"){
    this.http.post(this._servicioCompartido.Url+'/obtenerCarruselVenta.php', body)
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
    this.http.post(this._servicioCompartido.Url+'/obtenerCarruselVenta.php', body)
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
    this.http.post(this._servicioCompartido.Url+'/obtenerCarruselVenta.php', body)
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


    this.http.post(this._servicioCompartido.Url+'/obtenerUnicoArticulo.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
                console.log(result);
              this.Unidades = result[0]['Unidades'];
              
              if(Number(this.Unidades) <= 0)
              {
                
                this.verificacionProductos = false;
              }
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
          for(let producto of this.productos)
          {
              this.Imagen=producto.Imagen;
             
          }
    });
  }

  
  masInformacion(IdProducto: string, Categoria: string){
    this.IdProducto = IdProducto;
    this.Categoria = Categoria;
    this.router.navigate(['venta',Categoria,IdProducto]);
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
    // ... Why? ...
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
  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }

  navegarCarrito()
  {
    this.router.navigate(['Carrito']);
  }



  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }
  navegarCategoria(Categoria:string, SubCategoria: string){

    console.log(SubCategoria);
    this.router.navigate(['categoria',Categoria,SubCategoria]);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
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
