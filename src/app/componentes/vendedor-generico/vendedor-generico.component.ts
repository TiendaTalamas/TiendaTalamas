import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { NgFallimgModule } from 'ng-fallimg';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import {Router, ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/map';

import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';


@Component({
  selector: 'app-vendedor-generico',
  templateUrl: './vendedor-generico.component.html',
  styleUrls: ['./vendedor-generico.component.css']
})
export class VendedorGenericoComponent implements OnInit {
  cadena: string;
 

  Categoria: string;
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;

  nombre: string;
  sub:string;
  //Aleatorio
  AA_Recomendados: string;
  data_Recomendados: any[];
  val_Recomendados: any[];
  contenedor_Recomendados: string;
  xxxMap_Recomendados = new Map();
  valuesKeys_Recomendados = new Array;
  articulosArray_Recomendados = new Array;
  noRegistrado:boolean;
  Portada:string;
  Imagen:string;


  //Variable del modal
  respuesta:string;

  constructor(private http: Http,private router: Router, private location:Location,
    public _servicioCompartido : servicioCompartido, fb : FormBuilder, public falla:NgFallimgModule, public Route:ActivatedRoute) {   
}
 

  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;
  articulosArray_Inst = new Array;
  NombreNegocio:string;

  ngOnInit()
  {
    this.NombreNegocio = this.Route.snapshot.paramMap.get('negocio');
    this.obtenerArticulosEspecificos();
    this.obtenerVendedor();
  }

  obtenerVendedor(){
    try {
      let body = new URLSearchParams();
      body.append('cadena', this.NombreNegocio);  
      this.http.post(this._servicioCompartido.Url+'/negocioExacto.php', body)
        
      .map((res:Response) => res.json())
              .subscribe(result => 
              {
          if(result["status"] == "200")
          {
            this.Portada = result["datos"]["0"]["Portada"];
            this.Imagen =  result["datos"]["0"]["Portada"];
          }else{
            this.router.navigate(['']);
          }
      });
    } catch (error) {
      this.router.navigate(['']);
    }
  }
  
  obtenerArticulosEspecificos() {
    let body = new URLSearchParams();
    body.append('marca', this.NombreNegocio);
    this.http.post(this._servicioCompartido.Url+'/articulosPorMarca.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            console.log(result)
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

  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.nombre = IdProducto;
    this.router.navigate(['venta',Categoria,IdProducto, Nombre]);
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
              this.respuesta=result;
              if(this.respuesta == "Iniciar sesion o registrarse para agregar al carrito")
              {
                this.noRegistrado= true;
              }else{
                this.noRegistrado = false;
                this._servicioCompartido.obtenerCantidadCarrito();
              }
    });

  }
  navegarJuegos()
  {
    this.router.navigate(['Juegos']);
  }
  navegarMusica()
  {
    this.router.navigate(['musica']);

  }
  navegarSesion()
  {

    this.router.navigate(['card'])


  }
}
