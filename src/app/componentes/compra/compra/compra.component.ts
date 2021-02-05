import { Component, OnInit } from '@angular/core';
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
  constructor(private router:Router,private http:Http,private Route:ActivatedRoute) {
 
   }
IdProducto:string;
  ngOnInit() {
    this.IdProducto = this.Route.snapshot.paramMap.get('id');
  }
  onSubmit() {
    let body = new URLSearchParams();
    body.append("Nombre", this.nombre);
    body.append("Apellido",this.apellido);
    body.append("NumeroTelefonico", this.numeroCelular);
    body.append("email", this.email)
    this.http.post('http://www.tiendatalamas.com/assets/php/pagoRedirigido.php', body)
  }

  continuarDatosBancarios()
  {


  }
}
