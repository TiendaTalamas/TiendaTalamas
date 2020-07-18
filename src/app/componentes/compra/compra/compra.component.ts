import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  ventaForm: FormGroup;
  ventaforma: FormGroup;
  email: string;
  nombre: string;
  apellido: string;
  calle1: string;
  calle2: string;
  calle3: string;
  ciudad: string;
  NumeroExterior:string;
  CodigoPostal:string;
  numeroCelular:string;
  constructor(private router:Router,private http:Http,private fb: FormBuilder,fb2: FormBuilder,private Route:ActivatedRoute) {
    this.ventaForm = fb.group({
      'email' : [null, Validators.required],
      'nombre': this.nombre,
      'apellido': this.apellido,  
      'calle1': this.calle1,
      'calle2': this.calle2,
      'calle3': this.calle3,
      'ciudad': this.ciudad,
      'NumeroExterior': this.NumeroExterior,
      'CodigoPostal': this.CodigoPostal,
      'numeroCelular': this.numeroCelular
    });
   }
IdProducto:string;
  ngOnInit() {
    this.IdProducto = this.Route.snapshot.paramMap.get('id');
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
  }

  continuarDatosBancarios()
  {
    let body = new URLSearchParams();
    body.append("Nombre", this.nombre);
    body.append("Apellido",this.apellido);
    body.append("NumeroTelefonico", this.numeroCelular);
    body.append("email", this.email)
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/pagoRedirigido.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {

    });
  }


}
