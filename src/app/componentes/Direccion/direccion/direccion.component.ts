import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router"
import {Location} from "@angular/common"
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import { isUndefined, isNull, isNullOrUndefined } from 'util';
import { Body } from '@angular/http/src/body';
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  formData:FormGroup;
  nombre:string;
  apellido:string;
  calle1:string;
  calle2:string;
  calle3:string;
  colonia:string;
  numExt:string;
  numInterior:string;
  numTel:string;
  codigoPost:string;
  estado:string;
  ciudad:string;
  gustos:string;
  gusto1:string;
  gusto2:string;
  gusto3:string;
  gusto4:string;
  carga:boolean;
  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, fb2: FormBuilder,public _servicioCompartido: servicioCompartido) {
    this.formData = fb.group({
      'calle1' : this.calle1,
      'calle2' : this.calle2,
      'calle3' :this.calle3,
      'colonia' : this.colonia,
      'numExt' : this.numExt,
      'numInterior' : this.numInterior,
      'codigoPost' : this.codigoPost,
      'estado' : this.estado,
      'ciudad': this.ciudad,
      'gustos' : this.gustos
    });
   }

  respuesta:string;
   modal:boolean;

  ngOnDestroy(): void {
    this._servicioCompartido.soloRegistro = false;
  }

  ngOnInit() {
    this.estado = "Distrito Federal";
     if(isUndefined(this._servicioCompartido.soloRegistro))
     {
       this.location.back();
     }
     this.modal = false;
     this.carga = false;
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

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }

  registrar()
  {
    this.modal = true;
  
    let errores = true;
    this.gustos = "No definidos";
    this._servicioCompartido.ApellidoMa = "Dato innecesario";
    if(isNullOrUndefined(this.numInterior) || this.numInterior == "")
    {
      this.numInterior = "0";
    }
    if(isNullOrUndefined(this.numExt) || this.numExt == "")
    {
      errores = false;
    }
    if(this.calle1 == "" || isNullOrUndefined(this.calle1))
    {
      errores = false;
    }
    if(this.calle2 == "" || isNullOrUndefined(this.calle2))
    {
      errores = false;
    }

    if(this.calle3 == "" || isNullOrUndefined(this.calle3))
    {
      errores = false;
    }

    if(this.colonia == "" || isNullOrUndefined(this.colonia))
    {

      errores = false;
    }
    if(errores)
    {
      
    let body = new URLSearchParams();
      
    body.append('nombre', this._servicioCompartido.Nombre);
    body.append('apellidoPa', this._servicioCompartido.ApellidoPa);
    body.append('apellidoMa', this._servicioCompartido.ApellidoMa);
    body.append('email', this._servicioCompartido.email);
    body.append('numTel', this._servicioCompartido.NumeroTel);
    body.append('contrasena', this._servicioCompartido.contrasena);
    body.append('calle1', this.calle1);
    body.append('calle2', this.calle2);
    body.append('calle3', this.calle3);
    body.append('colonia', this.colonia);
    body.append('numExt', this.numExt);
    body.append('numInt', this.numInterior);
    body.append('codigoPost', this.codigoPost);
    body.append('estado', this.estado);
    body.append('ciudad', this.ciudad);
    body.append('gustos', this.gustos);

    this.http.post(this._servicioCompartido.Url+'/registrar.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
                if(result['status'] == "400")
                {
                  this.modal = false;
                  this.respuesta=result['mensaje'];
                  alert(this.respuesta);
                }
                else
                {
                  this.carga = true;
                  localStorage.setItem('Token', result['token']);
                  alert(result['sql']);
                }
                
          });
        }else{
          alert("Por favor rellene todos los datos");
          this.modal = false;
          this.carga = false;
        }
  }

  guardarGustos()
  {
    this.carga = false;
    this.gustos ="Libro favorito: "+this.gusto1+"<br> Instrumento favorito: "+this.gusto2+"<br> Artista favorito:"+this.gusto3+"<br> Escritor favorito: "+this.gusto4;
    let body = new URLSearchParams();
    body.append('gustos',this.gustos);
    body.append('token',localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/guardarGustos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
                
                if(result['status'] == "400")
                {
                  this.modal = false;
                  this.router.navigate(['']);
                  this.carga = false;
                  this._servicioCompartido.recargar = true;
                }
                else
                {
                  this.router.navigate(['']);
                  this.modal = false;
                  this.carga = false;
                  this._servicioCompartido.recargar = true;

                }
                
          });
  }

  omitir()
  {
    this.modal = true;
    
    this.gustos = "No definidos";
    this._servicioCompartido.ApellidoMa = "Dato innecesario";
    let body = new URLSearchParams();
      
    body.append('nombre', this._servicioCompartido.Nombre);
    body.append('apellidoPa', this._servicioCompartido.ApellidoPa);
    body.append('apellidoMa', this._servicioCompartido.ApellidoMa);
    body.append('email', this._servicioCompartido.email);
    body.append('numTel', this._servicioCompartido.NumeroTel);
    body.append('contrasena', this._servicioCompartido.contrasena);
    body.append('gustos', this.gustos);

    this.http.post(this._servicioCompartido.Url+'/omitir.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
                if(result['status'] == "400")
                {
                  this.respuesta=result['mensaje'];
                  alert(this.respuesta);
                  this.modal = false;
                }
                else
                {
                  localStorage.setItem('Token', result['token']);
                  alert(result['sql']);
                  this.modal = true;
                  this.carga = true;
                }
                
          });
        
  }

}
