import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

import {Location} from "@angular/common";



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  DatosError:boolean = false;
 
  registroForm: FormGroup;
  email: string;
  contrasena: string;
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;
ngOnInit(){

}

  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http){
    this.registroForm = fb.group({
      'email' : [null, Validators.required],
  
      'contrasena': this.contrasena,

    });}

  registrar() {     
    if(!this.DatosError)
    {
      
    let body = new URLSearchParams();
  
    body.append('email', this.email);
  
    body.append('contrasena', this.contrasena);

  
    console.log(this.email);
   
    console.log(this.contrasena);

    this.http.post('http://192.168.1.99/talamas/inicioSesion.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
            console.log(result);
            this.articulosArray = result;
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


  navegarInicio()
  {
    this.router.navigate(['']);
    
  }
  
  navegarSesion()
  {

    this.router.navigate(['card'])


  }
  navegarRegistro()
  {
    this.router.navigate(['registro']);
    
  }
  navegarLibreria()
  {
    this.router.navigate(['libreria'])
  }

  navegarPublicidad()
  {
    this.router.navigate(['emd'])
  }
  navegarMusica()
  {
    this.router.navigate(['musica'])
  }
  
  navegarBusqueda()
  {
    this.router.navigate(['busqueda'])
  }
  
}
