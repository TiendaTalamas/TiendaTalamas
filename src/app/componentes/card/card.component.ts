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
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  DatosError:boolean = false;
  cadena: string;
  registro: FormGroup;
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
  this._servicioCompartido.comprobarUsuario();

}

  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, private fb2: FormBuilder, private _servicioCompartido: servicioCompartido) {
    
  {
    this.registroForm = fb.group({
      'email' : [null, Validators.required],
  
      'contrasena': this.contrasena,

    });
    this.registro = fb2.group({
      'cadena': this.cadena
    });
  }
}

  registrar() {     

      
    let body = new URLSearchParams();
  
    body.append('email', this.email);
  
    body.append('contrasena', this.contrasena);

  
    console.log(this.email);
   
    console.log(this.contrasena);

    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/inicioSesion.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
            console.log(result);
            localStorage.setItem('Nombre_U',result[0]['Nombre']);
            localStorage.setItem('ApellidoPa_U',result[0]['ApellidoPa']);
            localStorage.setItem('ApellidoMa_U',result[0]['ApellidoMa']);
            localStorage.setItem('email_U',result[0]['email']);
            localStorage.setItem('NumeroTel_U',result[0]['NumeroTel']);
            localStorage.setItem('Imagen_U',result[0]['Imagen']);
            localStorage.setItem('Token_U',result[0]['Token']);

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
          this.navegarInicio();
    });

    
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
    this._servicioCompartido.setCadena(this.cadena);
    console.log(this.cadena);
    this.router.navigate(['busqueda'])
  }
  
}
