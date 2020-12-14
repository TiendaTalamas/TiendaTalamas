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
  selector: 'app-confirmacion-pedido',
  templateUrl: './confirmacion-pedido.component.html',
  styleUrls: ['./confirmacion-pedido.component.css']
})
export class ConfirmacionPedidoComponent implements OnInit {

  constructor(public _servicioCompartido : servicioCompartido,private router:Router,private http:Http,private fb: FormBuilder,fb2: FormBuilder,private Route:ActivatedRoute, public falla:NgFallimgModule) { }

  ngOnInit() {
    this._servicioCompartido.soloLogueado();
    this.obtenerSubtotal();
    if(isNullOrUndefined(this._servicioCompartido.Direccion)){
      this.router.navigate(['DatosDePago']);
    }
    this.Direccion = this._servicioCompartido.Direccion;
    this.obtenerCarrito();
  }
  Direccion:string;
  Subtotal:string;
  Envio:string;
  Total:string;
  articulosArray = new Array;
  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.router.navigate(['venta',Categoria,IdProducto, Nombre]);
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
                this.Envio = "0";
                if(this._servicioCompartido.Direccion.includes("Nuevo Laredo")){
                  this.Envio = "30";
                }
                if(Number(this.Subtotal) <= 1 && !this._servicioCompartido.Direccion.includes("Nuevo Laredo")){

                  this.Envio = String(500 - Number(this.Subtotal));
                }
                this.Total = String(Number(this.Envio) + Number(this.Subtotal))
              }
              else{
                this.Subtotal = "0";
              }
              if(Number(this.Subtotal) <= 0)
              {
                this.router.navigate(['']);
              }
    });

  }
  confirmarCompra()
  {
    this.router.navigate(['Pago']);
  }
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

}
