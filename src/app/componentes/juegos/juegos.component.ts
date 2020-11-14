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
    this.obtenerArticulos();
  }
  
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;
  anadirAlCarrito(IdProducto){}
  obtenerArticulos() {
    let body = new URLSearchParams();
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

  navegarLibreria()
  {
    this.router.navigate(['libreria']);
  }

  navegarMusica()
  {
    this.router.navigate(['musica']);
  }

  masInformacion(IdProducto: string, Categoria: string){

    this.router.navigate(['venta',Categoria,IdProducto]);
   }
   
}
