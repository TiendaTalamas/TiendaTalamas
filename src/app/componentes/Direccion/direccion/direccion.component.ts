import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {Location} from "@angular/common"
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import { isUndefined, isNull } from 'util';
import { Body } from '@angular/http/src/body';
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  formData:FormGroup;
  calle1:string;
  calle2:string;
  calle3:string;
  colonia:string;
  numExt:string;
  numInterior:string;
  codigoPost:string;
  estado:string;
  ciudad:string;
  gustos:string;
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

  ngOnDestroy(): void {
    this._servicioCompartido.soloRegistro = false;
  }

  ngOnInit() {
    if(isUndefined(this._servicioCompartido.soloRegistro))
    {
      this.location.back();
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

    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/registrar.php', body)
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
                  localStorage.setItem('Token', result['token']);
                  alert(result['sql']);
                }
                
          });

    
  }

}
