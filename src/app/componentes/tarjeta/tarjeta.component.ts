import { Component, OnInit } from '@angular/core';
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router, ActivatedRoute, RouterLinkActive} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { importType, IfStmt } from '@angular/compiler/src/output/output_ast';
import { isNullOrUndefined } from 'util';
import { NgFallimgModule } from 'ng-fallimg';
declare var Stripe: any;

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  isDisabled = false;
  item:string;
  Subtotal:string;
  cantidad:string;
  Envio:string;
  Total:string;
  nombre:string;
  apellido:string;
  constructor(private http:Http, public _servicioCompartido:servicioCompartido, private router:Router, private route:ActivatedRoute, public falla:NgFallimgModule) { }
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
  ngOnInit() {
    this.item =this.route.snapshot.paramMap.get('IdProducto');
    this.cantidad = this.route.snapshot.paramMap.get('Cantidad');
    this.obtenerSubtotal();
    console.log(this._servicioCompartido.IdProducto);
    console.log(this._servicioCompartido.Cantidad);
    if(isNullOrUndefined(this._servicioCompartido.Direccion)){
      this.router.navigate(['DatosDePago',this.item,this.cantidad]);
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
    }else{
    let body = new URLSearchParams();
    body.append("jsonUsuario", this._servicioCompartido.jsonUsuario);
    body.append("Direccion", this._servicioCompartido.Direccion);
    body.append("IdProducto", this.item);
    body.append("Cantidad", this.cantidad);
    body.append("stripeToken", stripeToken);
    this.cantidad = "0";
    body.append("Token", localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/pagoIndividual.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              console.log(result);
              if(result['status'] == 200)
              {
                this.router.navigate(['CuadroExitoso',"Exito",result['IdCompra']]);
              }
              if(result['status'] == 400){
                this.router.navigate(['CuadroExitoso',"Fallo",result['IdCompra']]);
              }
              if(result['status'] == 402){
                alert("Existe un error con la tarjeta: "+result['IdCompra']);
                this.cantidad = this.route.snapshot.paramMap.get('Cantidad');
                this.isDisabled = false;
              }
              if(result['status'] == 405){
                alert("La tarjeta fue declinada");
                this.cantidad = this.route.snapshot.paramMap.get('Cantidad');
                this.isDisabled = false;
              }
    });
  }
  }

}
