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
  emailR:string;
  nombre:string;
  apellido:string;
  numero:string;
  contrasena1:string;
  contrasena2:string;
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
  this._servicioCompartido.soloSinLoguear();
}

  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, private fb2: FormBuilder, public _servicioCompartido: servicioCompartido) {
    
  {
    this.registroForm = fb.group({
      'email' : [null, Validators.required],
      'emailR' : [null, Validators.required],
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

    this.http.post(this._servicioCompartido.Url+'/inicioSesion.php', body)
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
                alert(this.respuesta);
                }

    });

    
  }


  registra() {     
    if(this.nombre.length<3)
    {
      this.DatosError=true;
      alert("La cadena debe ser mayor a 2 caracter")
    }
    if(this.nombre.includes("@"))
    {
      this.DatosError=true;
      alert("Tiene un caracter no valido en el nombre")
       
    }
    if(!this.DatosError)
    {
      
    let body = new URLSearchParams();
    body.append('nombre', this.nombre);
    body.append('email', this.emailR);
    body.append('apellido_pa', this.apellido);
    body.append('apellido_ma', this.apellido);
    body.append('numero_tel', this.numero);
    body.append('contrasena', this.contrasena);

    this.http.post(this._servicioCompartido.Url+'/registro.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
                console.log(result);
                if(result['status'] == "400")
                {
                  this.respuesta=result['mensaje'];
                  alert(this.respuesta);
                }
                else
                {

                  this.router.navigate(['Direccion']);
                  this._servicioCompartido.Nombre = this.nombre;
                  this._servicioCompartido.email = this.email;
                  this._servicioCompartido.ApellidoPa = this.apellido;
                  this._servicioCompartido.ApellidoMa = this.apellido
                  this._servicioCompartido.NumeroTel = this.numero;
                  this._servicioCompartido.contrasena = this.contrasena;
                  this._servicioCompartido.soloRegistro = true;
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
  

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }
}
