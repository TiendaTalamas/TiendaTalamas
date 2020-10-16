import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { servicioCompartido } from '../../../servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  cadena: string;
  constructor(private router:Router,private http:Http,public _servicioCompartido:servicioCompartido) { }

  ngOnInit() {
    this.obtenerCompras();
    this._servicioCompartido.soloLogueado();
    this._servicioCompartido.comprobarUsuario();
  }

  registroForm:FormGroup;
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;
  Subtotal:string;
  articulosArray_Sub = new Array;

  navegarInicio()
  {
    this.router.navigate(['']);
    this.obtenerCompras();
  }

  obtenerCompras()
  {
    let body = new URLSearchParams();
    body.append("token",localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/compras.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result);
            this.articulosArray = result;
            console.log(this.articulosArray);
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
    this.router.navigate(['Carrito'])
  }
  navegarCategoria(Categoria:string, SubCategoria: string){

    console.log(SubCategoria);
    this.router.navigate(['categoria',Categoria,SubCategoria]);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
  }
  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }
  masInformacion(IdProducto: string, Categoria: string){

    this.router.navigate(['venta',Categoria,IdProducto]);
  }
}
