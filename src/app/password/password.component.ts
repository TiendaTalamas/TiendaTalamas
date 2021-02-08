import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import { isNull, isUndefined } from 'util';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
 
})

export class PasswordComponent implements OnInit {

  RespuestaBoton:boolean;
  RespuestaAlert:boolean;
  RespuestaCodigo:boolean;
  email:string;
  codigo:string;
  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, private fb2: FormBuilder, public _servicioCompartido: servicioCompartido) { }

  ngOnInit() {

  this.RespuestaBoton=false;
  this.RespuestaAlert=true;
  this.RespuestaCodigo=false;
    
  }

  cerrarAlert()
  {
    this.RespuestaAlert = true;
  }

  CambioDeTexto()
  {
    let body = new URLSearchParams();
    body.append('email', this.email);
    this.http.post(this._servicioCompartido.Url+'/buscarCorreo.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
                if(result['mensaje'] == "TRUE"){
                  this.RespuestaBoton=true;
                  

                }else{
                this.RespuestaAlert = false;
                }
              })
  }

  PruebaAlert()
  {
    this.RespuestaAlert=true;
    console.log(this.RespuestaAlert);
  }

  CambioCodigo()
  {
    let body = new URLSearchParams();
    body.append('email', this.email);
    body.append('codigo', this.codigo);
    this.http.post(this._servicioCompartido.Url+'/enviarCodigo.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
                if(result['mensaje'] == "TRUE"){
                  this._servicioCompartido.email = this.email;
                this.router.navigate(['restablecer']);                  

                }else{
                this.RespuestaAlert = false;
                }
              })
  }
  
  CerrarAlert()
  {
    this.RespuestaAlert=false;
  }
}
