import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { servicioCompartido } from '../../servicios/servicioCompartido';

@Component({
  selector: 'app-contenedor1',
  templateUrl: './contenedor1.component.html',
  styleUrls: ['./contenedor1.component.css']
})
export class Contenedor1Component implements OnInit {
  //
  nombre: string;
  productoObjeto: producto[];
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
   AA_Recientes: string;
   data_Recientes: any[];
   val_Recientes: any[];
   contenedor_Recientes: string;
   xxxMap_Recientes = new Map();
   valuesKeys_Recientes = new Array;
   articulosArray_Recientes = new Array;



  constructor(private http: Http,private router: Router, private location:Location,
    private _servicioCompartido : servicioCompartido) { }

  ngOnInit() {
    this.obtenerArticulos();
    this.obtenerOfertas();
  }

  //Obteniendo datos
  obtenerArticulos() {
    let body = new URLSearchParams();
    this.http.post('http://192.168.1.99/talamas/articulosVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result);
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
//Metodo para obtener Ofertas
  obtenerOfertas() {
    let body = new URLSearchParams();
    this.http.post('http://192.168.1.99/talamas/ofertas.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Ofertas = "";
            this.data_Ofertas = [];
            console.log(result);
            this.articulosArray_Ofertas = result;
            for (var key in result) {
            this.AA_Ofertas = this.AA_Ofertas + key;
            if (result.hasOwnProperty(key)) {
              this.val_Ofertas = result[key];
              this.data_Ofertas.push(Object.keys(this.val_Ofertas));
              for (var i = 0; i < Object.keys(this.val_Ofertas).length; i++) {
              this.contenedor_Ofertas = Object.keys(this.val_Ofertas)[i];
              Object.entries(this.val_Recientes)[i]
               
                this.xxxMap_Ofertas.set(Object.keys(this.val_Ofertas)[i], Object.values(this.val_Ofertas)[i]);
                this.valuesKeys_Ofertas.push(Object.keys(this.val_Ofertas)[i], Object.values(this.val_Ofertas)[i]);

                }
             }
          }
    });
  }

  obtenerRecientes() {
    let body = new URLSearchParams();
    this.http.post('http://192.168.1.99/talamas/.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes = "";
            this.data_Recientes = [];
            console.log(result);
            this.articulosArray_Recientes = result;
            for (var key in result) {
            this.AA_Recientes = this.AA_Recientes + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes= result[key];
              this.data_Recientes.push(Object.keys(this.val_Recientes));
              for (var i = 0; i < Object.keys(this.val_Recientes).length; i++) {
              this.contenedor_Recientes = Object.keys(this.val_Recientes)[i];
              Object.entries(this.val_Recientes)[i]
               
                this.xxxMap_Recientes.set(Object.keys(this.val_Recientes)[i], Object.values(this.val_Recientes)[i]);
                this.valuesKeys_Recientes.push(Object.keys(this.val_Recientes)[i], Object.values(this.val_Recientes)[i]);

                }
             }
          }
    });
  }

  masInformacion(nombre:string, descripcion: string, unidades: number, imagen: string){
    this.nombre = nombre;
    console.log(this.nombre);
    this.router.navigate(['venta']);
    this.productoObjeto = [{
      nombre: nombre,
      descripcion: descripcion,
      unidades: unidades,
      imagen: imagen,
  }]
  this._servicioCompartido.setProductoData(this.productoObjeto);
  
  }

}


