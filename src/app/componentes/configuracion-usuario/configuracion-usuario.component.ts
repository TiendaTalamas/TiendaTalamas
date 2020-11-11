import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormBuilder, FormGroup} from '@angular/forms';
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
      //Datos Slider
      AA: string;
      data: any[];
      val: any[];
      contenedor: string;
      xxxMap = new Map();
      valuesKeys = new Array;
      direccionesArray = new Array;

  cadena: string;
  cambioDireccion: FormGroup;
  registroForm: FormGroup;
  cambioContrasena: FormGroup;
  contrasenaActual: string;
  contrasenaNueva:string;
  contrasenaRepetida:string;
  calle1:string;
  calle2:string;
  calle3:string;
  numeroE:string;
  colonia:string;
  ciudad:string;
  estado:string;
  pais:string;
  codigoPostal:string;
  constructor(private router: Router, public _servicioCompartido : servicioCompartido, private fb: FormBuilder, private fb2: FormBuilder,private fb3: FormBuilder, private http: Http) { 
    this.registroForm = fb.group({
      'cadena' : this.cadena
    
  })
  this.cambioContrasena = fb2.group({
    'contrasenaActual' : this.contrasenaActual,
    'contrasenaNueva'  : this.contrasenaNueva,
    'contrasenaRepetida' : this.contrasenaRepetida,
  
  })
  this.cambioDireccion = fb3.group({
   'calle1' : this.calle1,
   'colonia' : this.colonia,
   'numero' : this.numeroE,
   'calle2' : this.calle2,
   'calle3' : this.calle3,
   'ciudad' : this.ciudad,
   'codigoPostal' : this.codigoPostal,
   'estado' : this.estado,
   'pais' : this.pais
  })
  ;}

  ngOnInit() {
    this.obtenerDirecciones();
    this._servicioCompartido.comprobarUsuario();
    this._servicioCompartido.soloLogueado();
  }

  navegarHistorial()
  {
    this.router.navigate(['historial']);
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



  cambiarContrasena()
  {
    let body = new URLSearchParams();
  
    body.append('token', localStorage.getItem('Token'));
    body.append('contrasenaActual', this.contrasenaActual);
    body.append('contrasenaNueva', this.contrasenaNueva);
    body.append('contrasenaRepetida', this.contrasenaRepetida);
  
   
    this.http.post(this._servicioCompartido.Url+'/CambiarContrasena.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
              {
                if(result == "OK")
                {
                  alert("Cambio realizado correctamente");
                  this.contrasenaActual = "";
                  this.contrasenaNueva = "";
                  this.contrasenaRepetida = "";
                }
                else
                {
                  alert(result)
                }
    });

    
  }


  cambiarDireccion()
  {
    let body = new URLSearchParams();
  
    body.append('token', localStorage.getItem('Token'));
    body.append('calle1', this.calle1);
    body.append('calle2', this.calle2);
    body.append('numero', this.numeroE);
    body.append('colonia', this.colonia);
    body.append('codigoPostal', this.codigoPostal);
    body.append('ciudad', this.ciudad);
    body.append('estado', this.estado);
    body.append('pais', this.calle1);



   
    this.http.post(this._servicioCompartido.Url+'/agregarDireccion.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
              {
                if(result == "OK")
                {
                  alert("Cambio realizado correctamente");
                }
                else if(result == "ERROR")
                {
                  alert("ERROR")
                }
    });

    
  }
  obtenerDirecciones() {
    let body = new URLSearchParams();
    body.append('token', localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/obtenerDirecciones.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA = "";
            this.data = [];
            this.direccionesArray = result;
            this.calle1 = result[0]["Calle"];
            this.calle2 = result[0]["Calle2"];
            this.calle3 = result[0]["Calle3"];
            this.ciudad = result[0]["Ciudad"];
            this.codigoPostal = result[0]["CodigoPostal"];
            this.numeroE = result[0]["NumeroExterior"];
            this.colonia = result[0]["Colonia"];
            this.estado = result[0]["Estado"];
            this.pais = result[0]["Pais"];
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
  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
  }
}
