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
  button:string;
  bloquear:boolean;
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
                if(this._servicioCompartido.Direccion.includes("Nuevo Laredo")){
                  this.Envio = "30";
                }
                if(isNullOrUndefined(this.Subtotal)){
                  this.router.navigate(['']);
                }
                if(Number(this.Subtotal) > 0 && !this._servicioCompartido.Direccion.includes("Nuevo Laredo")){
                  this.Envio =  result['envio'];
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
    this.button = "Pagar";
    this.obtenerSubtotal();
    console.log(this._servicioCompartido.IdProducto);
    console.log(this._servicioCompartido.Cantidad);
    if(isNullOrUndefined(this._servicioCompartido.Direccion)){
      this.router.navigate(['DatosDePago',this.item,this.cantidad]);
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
      this.button = "Cargando...";
      event.preventDefault();
      stripe.createToken(card).then(result => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          this.button = "Pagar";
          this.isDisabled = false;
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
      this.button = "Pagar";
    }else{
      this.bloquear = true;
    let body = new URLSearchParams();
    body.append("jsonUsuario", this._servicioCompartido.jsonUsuario);
    body.append("Direccion", this._servicioCompartido.Direccion);
    body.append("IdProducto", this.item);
    body.append("Cantidad", this.cantidad);
    body.append("stripeToken", stripeToken);
    body.append('DireccionE',this._servicioCompartido.DireccionE);
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
                this._servicioCompartido.IdPedido = result['IdPedido'];              }
              if(result['status'] == 400){
                this.router.navigate(['CuadroExitoso',"Fallo",result['IdCompra']]);
              }
              if(result['status'] == 402){
                alert("Existe un error con la tarjeta: "+result['IdCompra']);
                this.cantidad = this.route.snapshot.paramMap.get('Cantidad');
                this.isDisabled = false;
                this.bloquear = false;
                this.button = "Pagar";
              }
              if(result['status'] == 405){
                alert("La tarjeta fue declinada");
                this.cantidad = this.route.snapshot.paramMap.get('Cantidad');
                this.isDisabled = false;
                this.bloquear = false;
                this.button = "Pagar";
              }
    });
  }
  }

}
