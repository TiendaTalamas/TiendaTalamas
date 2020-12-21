import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
 
})

export class PasswordComponent implements OnInit {

  RespuestaBoton:boolean;
  RespuestaAlert:boolean;
  RespuestaCodigo:boolean;

  
  constructor() { }

  ngOnInit() {

  this.RespuestaBoton=false;
  this.RespuestaAlert=false;
  this.RespuestaCodigo=false;
    
  }

  CambioDeTexto()
  {
    this.RespuestaBoton=true;
    console.log(this.RespuestaBoton);
  }

  PruebaAlert()
  {
    this.RespuestaAlert=true;
    console.log(this.RespuestaAlert);
  }

  CambioCodigo()
  {
    this.RespuestaCodigo=true;
    console.log(this.RespuestaCodigo);
  }
  
  CerrarAlert()
  {
    this.RespuestaAlert=false;
  }
}
