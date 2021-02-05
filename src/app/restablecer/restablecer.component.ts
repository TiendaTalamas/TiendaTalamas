import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import { isNull, isNullOrUndefined, isUndefined } from 'util';
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {

  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, private fb2: FormBuilder, public _servicioCompartido: servicioCompartido) { }
  email:string;
  contrasena:string;
  rcontrasena:string;
  RespuestaAlert:boolean;
  RespuestaAlert2:boolean;

  ngOnInit() {
    this.email = this._servicioCompartido.email;
    if(isNullOrUndefined(this.email)){
      this.router.navigate(['']);
    }
    this.RespuestaAlert = true;
  }

  cambiar(){
    if (this.contrasena == this.rcontrasena) {
      let body = new URLSearchParams();
      body.append('email', this.email);
      body.append('Contrasena', this.contrasena);
      this.http.post(this._servicioCompartido.Url+'/actualizarContrasena.php', body)
      .map((res:Response) => res.json())
              .subscribe(result => 
                {
                  if(result['status'] == "200"){
                  this.router.navigate(['card']);
                  alert("Cambio realizado correctamente");                  
                  }else{
                  this.RespuestaAlert2 = false;
                  }
                })
    }else{
      this.RespuestaAlert = false;

    }

  }
  cerrarAlert(){
    this.RespuestaAlert = true;
    this.RespuestaAlert2 = true;  }
}
