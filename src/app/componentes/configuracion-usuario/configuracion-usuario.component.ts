import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {
  cadena: string;
  registroForm: FormGroup;
  cambioContrasena: FormGroup;
  contrasenaActual: string;
  contrasenaNueva:string;
  contrasenaRepetida:string;
  constructor(private router: Router, private _servicioCompartido : servicioCompartido, private fb: FormBuilder, private fb2: FormBuilder, private http: Http) { 
    this.registroForm = fb.group({
      'cadena' : this.cadena
    
  })
  this.cambioContrasena = fb2.group({
    'contrasenaActual' : this.contrasenaActual,
    'nuevaContrasena'  : this.contrasenaNueva,
    'contrasenaRepetida' : this.contrasenaRepetida
  })
  ;}

  ngOnInit() {
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
    this.router.navigate(['musica']);

  }

  navegarBusqueda()
  {
    this._servicioCompartido.setCadena(this.cadena);
    console.log(this.cadena);
    this.router.navigate(['busqueda'])
  }

  cambiarContrasena()
  {
    let body = new URLSearchParams();
  
    body.append('email', localStorage.getItem('email_U'));
    body.append('contrasenaActual', this.contrasenaActual);
    body.append('contrasenaNueva', this.contrasenaNueva);
    body.append('contrasenaRepetida', this.contrasenaRepetida);
  
    console.log(localStorage.getItem('email_U'));
   
    this.http.post('http://192.168.1.99/talamas/CambiarContrasena.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
              {
                if(result == "OK")
                {
                  alert("Cambio realizado correctamente");
                }
                else if(result == "ERROR")
                {
                  alert("Contaseña no valida")
                }
    });

    
  }

}
