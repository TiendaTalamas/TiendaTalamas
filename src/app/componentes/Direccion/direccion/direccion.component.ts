import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {Location} from "@angular/common"
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, fb2: FormBuilder,public _servicioCompartido: servicioCompartido) { }

  ngOnInit() {
  }
  navegarInicio()
  {
    this.router.navigate(['']);
    
  }

  validarIngreso()
  {
    
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

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }

}
