import { Component, OnInit, Input, Injectable,Inject } from '@angular/core';
//Importando los servicios para obtener los datos del producto
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { importType, IfStmt } from '@angular/compiler/src/output/output_ast';
import { NgFallimgModule } from 'ng-fallimg';
import { Meta, Title } from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';


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
  Cantidad:number;
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
  respuesta:string;
  noRegistrado:boolean;
  CantidadMaxima:number;
  imagenPorDefault:string;
  imagenActual:string;
  personalizado:boolean;
  //array para guardar los valores

  constructor(public _servicioCompartido : servicioCompartido,private router:Router,private http:Http,private fb: FormBuilder,fb2: FormBuilder,private Route:ActivatedRoute, public falla:NgFallimgModule, private metaService:Meta,@Inject(DOCUMENT) private _document:Document, private title:Title){ 
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
  url:string;
  user:string;
  verificacionProductos:boolean;
  formCantidad:FormGroup;
  disponible:boolean;
  EMD:boolean;
  script:string;
  actual:string;
  negocio:boolean;
  NombreNegocio:string;
  ngOnInit() {
    this.personalizado = false;
    this.IdProducto = this.Route.snapshot.paramMap.get('id');
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.actual = "https://tiendatalamas.com/Venta/"+this.Categoria+"/"+this.IdProducto+"/"+this.Route.snapshot.paramMap.get('Nombre');
    this.metaService.updateTag({property:'og:title',content:this.Route.snapshot.paramMap.get('Nombre')});
    this.metaService.updateTag({property:'og:url',Content:this.actual});
    this.metaService.updateTag({property:'og:image',Content:"https://tiendatalamas.com/assets/Imagenes/"+this.IdProducto});
    this.title.setTitle("Talamas");
    this.disponible = true;
    this.Cantidad = 1;
    this.quantity = "1";
    this.verificacionProductos = true;
    this.Nombrecito = localStorage.getItem("Nombre_U");
    this.Apellidito = localStorage.getItem("ApellidoPa_U");
    this.Correito = localStorage.getItem("email_U");
    this.IdProducto = this.Route.snapshot.paramMap.get('id');
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.obtenerImagenes();

    this.user = localStorage.getItem("Token");
    
    this.obtenerArticulo();

    if(this.Categoria === undefined){
    }
    if(this.Categoria == "LIBROS" || this.Categoria == "Libros"){
      this.P1 = true;
    }
    else if(this.Categoria == "Instrumentos"){
      this.P2 = true;
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

  navegarCompra(IdProducto:string)
  {
    this.router.navigate(['DatosDePago',IdProducto,this.Cantidad]);
  }

  obtenerImagenes() {
    let body = new URLSearchParams();
    body.append("idProducto", this.IdProducto);
    this.http.post(this._servicioCompartido.Url+'/obtenerImagenesInstrumentos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            this.imagenesInstrumentos = result;
            
    });
  }
  obtenerVendedor(NombreNegocio){
    try {
      let body = new URLSearchParams();
      body.append('cadena', NombreNegocio);  
      this.http.post(this._servicioCompartido.Url+'/negocioExacto.php', body)
        
      .map((res:Response) => res.json())
              .subscribe(result => 
              {
          if(result["status"] == "200")
          {
            this.negocio = true;
            this.NombreNegocio = NombreNegocio;
          }else{
            this.negocio= false;
          }
      });
    } catch (error) {
      this.negocio= false;
    }
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
  aumentarCantidad()
  {
    if(this.Cantidad < Number(this.Unidades)){
      this.Cantidad ++;
      } 
 }
  disminuirCantidad()
  {
    if(this.Cantidad > 1){
    this.Cantidad --;
    }
  } 

  ObtenerMeta(producto:any)
  {

  }



  LibroAleatorio() {
    let body = new URLSearchParams();
    this.http.post(this._servicioCompartido.Url+'/libroAleatorio.php', body)
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
    this.http.post(this._servicioCompartido.Url+'/enviarCorreo.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
            {
              if(result == "Message has been sent")
              {
                alert("Mensaje enviado, en unos instantes recibira un mensaje en su whatsapp");
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
  navegarNegocio()
  {
    if(this.negocio){
      this.router.navigate([this.NombreNegocio]);

    }else{

    }
  }
  cambiarImagen(nuevaImagen:string){
    this.imagenActual = nuevaImagen;
  }
  //Obtiene el libro cuando recibe datos
  abrirFacebook()
  {
    window.open('https:\/\/www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(this.url),'facebook-share-dialog','width=626,height=436');
  }
  crearMetadatos(product)
  {
    let script;
    this.script = "{ \"@context\":\"https://schema.org\",\"@type\":\"Product\", \"productID\":\""+product.IdProducto+"\",\"name\":\""+product.NombreProducto+"\",\"description\":\""+product.Descripcion+"\",\"url\":\"https://tiendatalamas.com/Venta/Libros/"+product.IdProducto+"\",\"image\":\""+product.Imagen+"\", \"brand\":\""+product.Propiedad4+"\",\"offers\": [{\"@type\": \"Offer\",\"price\": \""+product.Precio+"\",\"priceCurrency\": \"MXN\",\"itemCondition\": \"https://schema.org/NewCondition\",\"availability\": \"https://schema.org/InStock\"}],\"additionalProperty\": [{\"@type\": \"PropertyValue\",\"propertyID\": \"978607\",\"value\": \"books\"}]}";
    script = this._document.createElement('script');
    script.setAttribute('class', 'structured-data');
    script.type = 'application/json+ld';
    script.text = this.script;
    this._document.head.appendChild(script);
  }
  obtenerArticulo(){
    let body = new URLSearchParams();
      
    body.append('id_producto', this.IdProducto);


    this.http.post(this._servicioCompartido.Url+'/obtenerUnicoArticulo.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.Unidades = result[0]['Unidades'];
              this.imagenPorDefault = result[0]['Imagen'];
              this.imagenActual = this.imagenPorDefault;
              if(Number(this.Unidades) <= 0)
              {
                this.disponible = false;
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

            this.url = "https://tiendatalamas.com/compartir.php?titulo="+producto.NombreProducto+"&description="+producto.Descripcion+"&image="+producto.Imagen+"&url=https://tiendatalamas.com/venta/Libros/"+producto.IdProducto+"/"+producto.NombreProducto;
              this.Imagen=producto.Imagen;
              if(producto.Propiedad4 == "EMD"){
                this.EMD = true;
              }
              if(producto.Clase == "Personalizado"){
                this.personalizado = true;
              }
              this.crearMetadatos(producto);
              this.obtenerVendedor(producto.Propiedad4);
          }
    });
  }

  

  
  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.IdProducto = IdProducto;
    this.Categoria = Categoria;
    this.router.navigate(['venta',Categoria,IdProducto, Nombre]);
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

  ventanaNueva(){	
    window.open("https://www.tiendatalamas.com/compartir.php?fbclid=IwAR042ZSpcU1sqsJGNL8kN2iV-81jOmCaaDE8RKBh_5I8_OsROzs14cghagA");
  }


  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }
  navegarCategoria(Categoria:string, SubCategoria: string){

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

      
  }

  defaultPrice(){
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
  anadirAlCarrito(IdProducto:string)
  {
    let body = new URLSearchParams();
    body.append("IdProducto",IdProducto);
    body.append("Cantidad", String(this.Cantidad));
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
              }
    });

  }
}
