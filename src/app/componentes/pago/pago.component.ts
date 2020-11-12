import { Component, OnInit } from '@angular/core';
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { importType, IfStmt } from '@angular/compiler/src/output/output_ast';
import { isNullOrUndefined } from 'util';
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { NgFallimgModule } from 'ng-fallimg';
declare var Stripe: any;
@Component({
  
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
  
})

export class PagoComponent implements OnInit {
  isDisabled = false;
  item:string;
  Subtotal:string;
  Envio:string;
  Total:string;
  cantidad:string;
  nombre:string;
  apellido:string;
  form2:FormGroup;
  button:string;
  bloquear:boolean;
  constructor(private http:Http, public _servicioCompartido:servicioCompartido, private router:Router, private route:ActivatedRoute, private fb:FormBuilder) {
    this.form2 = fb.group({
      'nombre':this.nombre,
      'apellido':this.apellido
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
                this.Envio = "0";
                if(Number(this.Subtotal) <= 1){
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
  ngOnInit() {
    this.button = "Pagar";
    this.bloquear = false;
    this.obtenerSubtotal();
    this.item = this._servicioCompartido.IdProducto;
    this.cantidad = this._servicioCompartido.Cantidad;

    if(isNullOrUndefined(this._servicioCompartido.Direccion)){
      this.router.navigate(['DatosDePago']);
    }
    // Your Stripe public key
    const stripe = Stripe('pk_test_51HIMK7FdBqnzMdTTfbNMiHsbOtBcEdoaovMyA4VQRRNmE9Qz50KrayBuwVy6o5bnNH33ktWU8nlN3qPjUOH1ipu000UFN1vHtS');
    // Create `card` element that will watch for updates
    // and display error messages
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');
    card.addEventListener('change', event => {
      this.obtenerSubtotal();
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    // Listen for form submission, process the form with Stripe,
    // and get the 
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', event => {
      this.isDisabled = true;
      this.button = "Cargando";
      event.preventDefault();
      stripe.createToken(card).then(result => {
        if (result.error) {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          this.isDisabled = false;
          this.button = "Pagar";
        } else {
          // At this point, you should send the token ID
          // to your server so it can attach
          // the payment source to a customer
          this.enviarToken(result.token.id);
        }
      });
    });
  }
  
  enviarToken(stripeToken:string)
  {
    if(isNullOrUndefined(this.nombre) && isNullOrUndefined(this.apellido) && this.bloquear){
      alert("Por favor ingrese el nombre del tramitante");
      this.isDisabled = false;
    }else{
      this.button = "Cargando";
      this.bloquear = true;
    let body = new URLSearchParams();
    body.append("DireccionE",this._servicioCompartido.DireccionE);
    body.append("jsonUsuario", this._servicioCompartido.jsonUsuario);
    body.append("Direccion", this._servicioCompartido.Direccion);
    body.append("stripeToken", stripeToken);
    body.append("Token", localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/generarPagoStripe.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              if(result['status'] == 200)
              {
                this.router.navigate(['CuadroExitoso',"Exito",result['IdCompra']]);
                this._servicioCompartido.IdPedido = result['IdPedido'];
              }
              if(result['status'] == 400){
                this.router.navigate(['CuadroExitoso',"Fallo",result['IdCompra']]);
              }
              if(result['status'] == 402){
                this.bloquear= false;
                alert("Existe un error con la tarjeta: "+result['IdCompra']);
                this.isDisabled = false;
                this.button = "Pagar";
              }
              if(result['status'] == 405){
                this.bloquear= false;
                alert("La tarjeta fue declinada");
                this.isDisabled = false;
                this.button = "Pagar";
              }
    });
  }
  }

}
