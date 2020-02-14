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
  //Datos separados
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;
  constructor(private http: Http,private router: Router, private location:Location,
    private _servicioCompartido : servicioCompartido) { }

  ngOnInit() {
    this.obtenerArticulos();
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
