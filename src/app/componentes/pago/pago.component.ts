import { Component, OnInit } from '@angular/core';
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { importType, IfStmt } from '@angular/compiler/src/output/output_ast';
declare var Stripe: any;
@Component({
  
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
  
})

export class PagoComponent implements OnInit {
  isDisabled = false;
  item:string;
  cantidad:string;
  constructor(private http:Http, private _servicioCompartido:servicioCompartido) { }

  ngOnInit() {
    this.item = this._servicioCompartido.IdProducto;
    this.cantidad = this._servicioCompartido.Cantidad;
    console.log(this._servicioCompartido.Direccion);
    console.log(this._servicioCompartido.jsonUsuario);
    // Your Stripe public key
    const stripe = Stripe('pk_test_51HIMK7FdBqnzMdTTfbNMiHsbOtBcEdoaovMyA4VQRRNmE9Qz50KrayBuwVy6o5bnNH33ktWU8nlN3qPjUOH1ipu000UFN1vHtS');
    // Create `card` element that will watch for updates
    // and display error messages
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');
    card.addEventListener('change', event => {
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
    let body = new URLSearchParams();
    body.append("item", this.item);
    body.append("cantidad", String(this.cantidad));
    body.append("jsonUsuario", this._servicioCompartido.jsonUsuario);
    body.append("Direccion", this._servicioCompartido.Direccion);
    body.append("stripeToken", stripeToken);
    this.http.post('http://localhost/talamas/generarPagoStripe.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {

              alert("result");
              console.log(result);
    });
  }

}
