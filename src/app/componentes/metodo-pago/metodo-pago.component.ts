import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent implements OnInit {
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  direccionesArray = new Array;
  constructor(private router: Router, private _servicioCompartido : servicioCompartido, private fb: FormBuilder, private fb2: FormBuilder,private fb3: FormBuilder, private http: Http) { }

  ngOnInit() {
    this.obtenerDirecciones();
  }
  obtenerDirecciones() {
    let body = new URLSearchParams();
    body.append('email', localStorage.getItem('email_U'));
    this.http.post('http://192.168.1.99/talamas/obtenerDirecciones.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            this.direccionesArray = result;
            for (var key in result) {
            this.AA = this.AA + key;
            if (result.hasOwnProperty(key)) {
              this.val = result[key];
              this.data.push(Object.keys(this.val));
              for (var i = 0; i < Object.keys(this.val).length; i++) {
              this.contenedor = Object.keys(this.val)[i];
              Object.entries(this.val)[i]
               
                this.xxxMap.set(Object.keys(this.val)[i], Object.values(this.val)[i]);
                this.valuesKeys.push(Object.keys(this.val)[i], Object.values(this.val)[i]);

                }
             }
          }
    });
  }

  
}
