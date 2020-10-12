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
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private http:Http, public _servicioCompartido: servicioCompartido) { }
  Nombre:string;
  Apellido:string;
  Correo:string;
  Telefono:string;
  coment:string;
  ngOnInit() {
  }
  enviar() {     

      
    let body = new URLSearchParams();
  
    body.append('Nombre', this.Nombre);
    body.append('Apellido', this.Apellido);
    body.append('Correo', this.Correo);
    body.append('Telefono', this.Telefono);
    body.append('Coment', this.coment);
    
    this.http.post(this._servicioCompartido.Url+'/correoContacto.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
              {
                console.log(result);
                if(result == "OK"){
                  alert("Mensaje enviado correctamente");
                  this.Nombre = "";
                  this.Apellido = "";
                  this.Correo = "";
                  this.Telefono = "";
                  this.coment = "";
                }else {
                  alert("Algo salio mal o los campos no fueron completamente rellenados");
                }

    });

    
  }

}
