import { Component, OnInit } from '@angular/core';
//Importando los servicios para obtener los datos del producto
import {servicioCompartido} from '../servicios/servicioCompartido';
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { importType, IfStmt } from '@angular/compiler/src/output/output_ast';
import { NgFallimgModule } from 'ng-fallimg';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {

  constructor(public _servicioCompartido : servicioCompartido,private router:Router,private http:Http,private fb: FormBuilder,fb2: FormBuilder,private Route:ActivatedRoute, public falla:NgFallimgModule) { }
  IdPedido:string;
  arrayPedido = new Array;
  arrayProductos = new Array;
  ngOnInit() {
    this._servicioCompartido.soloLogueado();
    this.IdPedido = this.Route.snapshot.paramMap.get("IdPedido");
    if(isNullOrUndefined(this.IdPedido)){
      this.router.navigate[''];
    }
    this.obtenerDetalles();
    this.obtenerProductos();
  }
  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.router.navigate(['venta',Categoria,IdProducto, Nombre]);
  }
  obtenerDetalles()
  {
    let body = new URLSearchParams();
    body.append('IdPedido', this.IdPedido);
    body.append("token",localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/obtenerDetalles.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              if(result['status'] == "200") {
                this.arrayPedido = result['datos'];
              }else{
                this.router.navigate(['']);
              }

                
             
          
    });
  }
  obtenerProductos()
  {
    let body = new URLSearchParams();
    body.append('IdPedido', this.IdPedido);
    body.append("token",localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/productosPedido.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              if(result['status'] == "200") {
                this.arrayProductos = result['datos'];
              }else{
                this.router.navigate(['']);
              }

                
             
          
    });
  }


}
