import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {Location} from "@angular/common"
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  DatosError:boolean = false;
  cadena: string;
  registroForm: FormGroup;
  registro: FormGroup;
  email: string;
  nombre: string
  apellidoPa: string;
  apellidoMa: string;
  telefono: string;
  contrasena: string;
  repContrasena: string;
  respuesta:string;

  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, fb2: FormBuilder,public _servicioCompartido: servicioCompartido){
    this.registroForm = fb.group({
      'email' : [null, Validators.required],
      'nombre': this.nombre,
      'apellidoPa': this.apellidoPa,  
      'apellidoMa': this.apellidoMa,
      'telefono': this.telefono,
      'contrasena': this.contrasena,
      'repContrasena': this.repContrasena
    });
  this.registro = fb2.group({
    'cadena': this.cadena
  });
  }

    ngOnInit() {
    }
    navegarConfiguracion()
    {
      this.router.navigate(['ConfiguracionUsuario']);
    }
    navegarInicio()
    {
      this.router.navigate(['']);
      
    }
    navegarCategoria(Categoria:string, SubCategoria: string){

      console.log(SubCategoria);
      this.router.navigate(['categoria',Categoria,SubCategoria]);
  
    this._servicioCompartido.setCategoria(Categoria);
    this._servicioCompartido.setSubCategoria(SubCategoria);
  
    
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
  
    navegarSesion()
    {
      this.router.navigate(['card'])
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
    
    registrar() {     
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
      body.append('email', this.email);
      body.append('apellido_pa', this.apellidoPa);
      body.append('apellido_ma', this.apellidoMa);
      body.append('numero_tel', this.telefono);
      body.append('contrasena', this.contrasena);
  
      console.log(this.nombre);
      console.log(this.email);
      console.log(this.apellidoPa);
      console.log(this.apellidoMa);
      console.log(this.telefono);
      console.log(this.contrasena);
      console.log(this.repContrasena);
      this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/registro.php', body)
      .map((res:Response) => res.json())
              .subscribe(result => 
                {
                  console.log(result);
                  if(result['status'] == "400")
                  {
                    this.respuesta=result['mensaje'];
                  }
                  else
                  {
                    localStorage.setItem('Token', result['token']);
                    this.respuesta="Usuario registrado correctamente";
                  }
                  
            });

      }

      
    }

    
  }



  

