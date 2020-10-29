import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
import { isUndefined, isNullOrUndefined } from 'util';
import { NgFallimgModule } from 'ng-fallimg';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private http:Http, private router:Router, public _servicioCompartido:servicioCompartido, private fb:FormBuilder, private location:Location,public falla:NgFallimgModule) {
    this.registroForm = fb.group({
      'cadena' : this.cadena

 });
    this.ventaForm = fb.group({
      'quantity' : this.quantity
    })
   }

  ngOnInit() {
    this.user = localStorage.getItem("Token");
    this.router.onSameUrlNavigation = 'reload';
    this.obtenerCarrito();
    this.obtenerSubCategoriasLibros();
    this.obtenerSubtotal();
    this._servicioCompartido.soloLogueado();
    this._servicioCompartido.comprobarUsuario();
  }
registroForm:FormGroup;
ventaForm:FormGroup;
cadena:string;
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;
  Subtotal:string;
  Producto:string;
  Cantidad:string;
  quantity:string;
  IdCarrito:string;
  user:string;
  obtenerCarrito()
  {
    let body = new URLSearchParams();
    body.append("token",localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/carrito.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {

            this.articulosArray = result;

    });

  }
  navegarPago()
  {
    this.router.navigate(['DatosDePago']);
  }
  quitarCarrito(IdCarrito:string)
  {
    let body = new URLSearchParams();
    body.append("token",localStorage.getItem('Token'));
    body.append("IdCarrito",IdCarrito);
    this.http.post(this._servicioCompartido.Url+'/quitarCarrito.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
            {
              if(result = "OK")
              {
                this.obtenerCarrito();
                this.obtenerSubtotal();
              }
              else{
                alert("Algo salio mal favor de recargar la pagina");
              }
    });

  }
  masInformacion(IdProducto: string, Categoria: string){

    this.router.navigate(['venta',Categoria,IdProducto]);
  }
  aumentarCantidad(IdCarrito:string, IdProducto:string){
    let body = new URLSearchParams();
    body.append("token",localStorage.getItem('Token'));
    body.append("IdCarrito",IdCarrito);
    body.append("IdProducto", IdProducto);
    this.http.post(this._servicioCompartido.Url+'/aumentarCantidad.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
            {
              if(result = "OK")
              {
                this.obtenerCarrito();
                this.obtenerSubtotal();
              }
              else{
                alert("Algo salio mal favor de recargar la pagina");
              }
    });
  }
  disminuirCantidad(IdCarrito:string)
  {
    let body = new URLSearchParams();
    body.append("token",localStorage.getItem('Token'));
    body.append("IdCarrito",IdCarrito);
    this.http.post(this._servicioCompartido.Url+'/disminuirCantidad.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
            {
              if(result = "OK")
              {
                this.obtenerCarrito();
                this.obtenerSubtotal();
              }
              else{
                alert("Algo salio mal favor de recargar la pagina");
              }
    });
  }
  obtenerSubtotal()
  {
    let body = new URLSearchParams();
    body.append("token",localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/obtenerSubtotal.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              if(result['status']  == "200")
              {
                this.Subtotal =result['subtotal'];
              }
              else{
                this.Subtotal = "0";
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

  cambiarCantidad(Cantidad:string, IdCarrito:string)
  {
    this.Cantidad= Cantidad;
    this.IdCarrito = IdCarrito;
  }

  modificarCantidad()
  { 
    if(!isNullOrUndefined(this.quantity))
    {
      let body = new URLSearchParams();
      body.append('categoria', "Libros");
      body.append('cantidad', this.quantity);
      body.append('IdCarrito', this.IdCarrito);
      body.append('producto', this.Producto);
      this.http.post(this._servicioCompartido.Url+'/cambiarCantidad.php', body)
      .map((res:Response) => res.json())
              .subscribe(result => 
                {
                  if(result['status'] == "200")
                  {
                    alert("Cambio realizado correctamente");
                  }
                  else{
                    alert("Ocurrio un error inesperado");
                  }
      });
    }
    else
    {
      alert("Seleccione un valor");
    }
  }


  navegarInicio()
  {
    this.router.navigate(['']);
    
  }
  
  navegarCarrito()
  {
    this.router.navigate(['Carrito']);
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
    this.router.navigate(['busqueda',this.cadena])
  }
  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }
  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }

}
