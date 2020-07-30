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
  respuesta:string;

ngOnInit(){
  this._servicioCompartido.comprobarUsuario();

}

  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, private fb2: FormBuilder, public _servicioCompartido: servicioCompartido) {
    
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
navegarBusqueda()
{
  this.router.navigate(['busqueda',this.cadena])
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
                if(result['status'] == "200")
                {
                  localStorage.setItem('Token', result['token']);
                  this.location.back();
                }
                else
                {
                this.respuesta=result['mensaje'];
                }

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
  

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }
}
