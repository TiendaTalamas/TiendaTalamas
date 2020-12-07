import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { NgFallimgModule } from 'ng-fallimg';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import {Router} from "@angular/router";


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

  //Variable del modal
  respuesta:string;

  constructor(private http: Http,private router: Router, private location:Location,
    public _servicioCompartido : servicioCompartido, fb : FormBuilder, public falla:NgFallimgModule) {   
}
 

  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;
  articulosArray_Inst = new Array;
 
  ngOnInit()
  {

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

}
