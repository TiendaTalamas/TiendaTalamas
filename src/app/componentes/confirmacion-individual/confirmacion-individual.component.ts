import { Component, OnInit } from '@angular/core';
//Importando los servicios para obtener los datos del producto
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { importType, IfStmt } from '@angular/compiler/src/output/output_ast';
import { NgFallimgModule } from 'ng-fallimg';
import { isNullOrUndefined } from 'util';
import {servicioCompartido} from 'src/app/servicios/servicioCompartido';

@Component({
  selector: 'app-confirmacion-individual',
  templateUrl: './confirmacion-individual.component.html',
  styleUrls: ['./confirmacion-individual.component.css']
})
export class ConfirmacionIndividualComponent implements OnInit {

  constructor(public _servicioCompartido : servicioCompartido,private router:Router,private http:Http,private fb: FormBuilder,fb2: FormBuilder,private Route:ActivatedRoute, public falla:NgFallimgModule,private route:ActivatedRoute) { }
  item:string;
  Envio:string;
  Subtotal:string;
  Total:string;
  cantidad:string;
  articulosArray = new Array;
  ngOnInit() {
    this.item =this.route.snapshot.paramMap.get('IdProducto');
    this.cantidad = this.route.snapshot.paramMap.get('Cantidad');
    if(isNullOrUndefined(this._servicioCompartido.Direccion)){
      this.router.navigate(['DatosDePago',this.item,this.cantidad]);
    }
    this.obtenerSubtotal();
    this.obtenerArticulo();
  }
  confirmarCompra()
  {
    this.router.navigate(['Pago',this.item,this.cantidad]);
  }
  obtenerSubtotal()
  {
    let body = new URLSearchParams();
    body.append("token",localStorage.getItem('Token'));
    body.append("IdProducto",this.item);
    this.http.post(this._servicioCompartido.Url+'/obtenerSubtotalIndividual.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              if(result['status']  == "200")
              {
                this.Envio = "0";
                this.Subtotal = String (Number(result['subtotal']) * Number(this.cantidad));
                if(isNullOrUndefined(this.Subtotal)){
                  this.router.navigate(['']);
                }
                if(Number(this.Subtotal) < 300){
                  this.Envio =  String(300-Number(this.Subtotal));
                }
                this.Total = String(Number(this.Subtotal) + Number(this.Envio));
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
  totalArticulo:string;
  obtenerArticulo(){
    let body = new URLSearchParams();
      
    body.append('id_producto', this.item);


    this.http.post(this._servicioCompartido.Url+'/obtenerUnicoArticulo.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              
                this.totalArticulo = String(Number(this.cantidad) * Number(result[0]['Precio']));
                this.articulosArray = result;
    });
  }
}
