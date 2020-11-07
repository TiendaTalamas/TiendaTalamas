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
                if(Number(this.Subtotal) <= 500){
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
    this.obtenerSubtotal();
    this.item = this._servicioCompartido.IdProducto;
    this.cantidad = this._servicioCompartido.Cantidad;
    console.log(this._servicioCompartido.Direccion);
    console.log(this._servicioCompartido.jsonUsuario);
    if(isNullOrUndefined(this._servicioCompartido.Direccion)){
      this.router.navigate(['DatosDePago']);
    }
    // Your Stripe public key
    const stripe = Stripe('pk_live_51HIMK7FdBqnzMdTTy9snyo9VqO8xHgXWOHcqPH23eTVS5XMiZNWFSZQODYPJBbRfM8JYMruJ3M5f3393bMiP0Xhm003iPuphsq');
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
      event.preventDefault();
      stripe.createToken(card).then(result => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          this.isDisabled = false;
        } else {
          // At this point, you should send the token ID
          // to your server so it can attach
          // the payment source to a customer
          console.log('Token acquired!');
          console.log(result.token);
          console.log(result.token.id);
          this.enviarToken(result.token.id);
        }
      });
    });
  }
  
  enviarToken(stripeToken:string)
  {
    if(isNullOrUndefined(this.nombre) && isNullOrUndefined(this.apellido)){
      alert("Por favor ingrese el nombre del tramitante");
      this.isDisabled = false;
    }else{
    let body = new URLSearchParams();
    body.append("jsonUsuario", this._servicioCompartido.jsonUsuario);
    body.append("Direccion", this._servicioCompartido.Direccion);
    body.append("stripeToken", stripeToken);
    body.append("Token", localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/generarPagoStripe.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              console.log(result);
              if(result['status'] == 200)
              {
                this.router.navigate(['DetallesPedido',result['IdCompra']]);
              }
              if(result['status'] == 400){
                this.router.navigate(['CuadroExitoso',"Fallo",result['IdCompra']]);
              }
              if(result['status'] == 402){
                alert("Existe un error con la tarjeta: "+result['IdCompra']);
                this.isDisabled = false;
              }
              if(result['status'] == 405){
                alert("La tarjeta fue declinada");
                this.isDisabled = false;
              }
    });
  }
  }

}
