import { Component, OnInit } from '@angular/core';
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-datos-pago-individuales',
  templateUrl: './datos-pago-individuales.component.html',
  styleUrls: ['./datos-pago-individuales.component.css']
})
export class DatosPagoIndividualesComponent implements OnInit {


  constructor(private Route:ActivatedRoute, public _servicioCompartido : servicioCompartido, private router:Router, private http:Http,private fb: FormBuilder) { }
  IdProducto:string;
  Cantidad:string;
  calle1:string;
  calle2:string;
  calle3:string;
  numeroE:string;
  colonia:string;
  ciudad:string;
  estado:string;
  Subtotal:string;
  pais:string;
  codigoPostal:string;
  Direccion:string;
  jsonUsuario:string;
  Calle1:string;
  NumeroExt:string;
  Colonia:string;
  Estado:string;
  Ciudad:string;
  CodPost:string;
  Nombre:string;
  Apellido:string;
  numExt:string;
  numInterior:string;

  codigoPost:string;
  ngOnInit() {
    this.IdProducto = this.Route.snapshot.paramMap.get('IdProducto');
    this.Cantidad = this.Route.snapshot.paramMap.get('Cantidad');
    if(isNullOrUndefined(this.IdProducto) || isNullOrUndefined(this.Cantidad) || Number(this.Cantidad)<=0 )
    {
      this.navegarInicio();
    }

    this.obtenerDirecciones();
    this._servicioCompartido.soloLogueado();

  }




   obtenerSubtotal()
  {
    let body = new URLSearchParams();
    body.append("token",localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/obtenerSubtotal.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
              if(result['status']  == "200")
              {
                this.Subtotal =result['subtotal'];
              }
              else{
                this.Subtotal = "0";
              }
    });

  }

  navegarInicio()
  {
    this.router.navigate(['']);
    
  }
  procederCompra()
  {
    this.router.navigate(['Pago',this.IdProducto,this.Cantidad]);
    this._servicioCompartido.IdProducto = this.IdProducto;
    this._servicioCompartido.Cantidad = this.Cantidad;
    this._servicioCompartido.jsonUsuario = this.jsonUsuario;
    this._servicioCompartido.Direccion = this.Direccion;
    this._servicioCompartido.Nombre = this.Nombre;
    this._servicioCompartido.ApellidoPa = this.Apellido;
    this._servicioCompartido.Calle = this.Calle1;
    this._servicioCompartido.NumeroExt = this.NumeroExt;
    this._servicioCompartido.Ciudad = this.Ciudad;
    this._servicioCompartido.Estado = this.Estado;
    this._servicioCompartido.CodigoPost = this.codigoPostal;
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
  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }

  navegarCarrito()
  {
    this.router.navigate(['Carrito']);
  }



  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }
  navegarCategoria(Categoria:string, SubCategoria: string){

    console.log(SubCategoria);
    this.router.navigate(['categoria',Categoria,SubCategoria]);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
  }

  obtenerDirecciones() {
    let body = new URLSearchParams();
    body.append('token', localStorage.getItem('Token'));
    this.http.post(this._servicioCompartido.Url+'/obtenerDirecciones.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            console.log(result);

            this.Calle1 = result[0]['Calle'];
            this.NumeroExt = result[0]['NumeroExterior'];
            this.Colonia = result[0]['Colonia'];
            this.Ciudad = result[0]['Ciudad'];
            this.Estado = result[0]['Estado'];
            this.CodPost = result[0]['CodigoPostal'];
            this.Nombre = result[0]['NombreOpcional'];
            this.Apellido = result[0]['Apellido'];
            this.Direccion = "Calle 1:"+result[0]["Calle"]+" Calle 2: "+result[0]["Calle2"]+" Calle 3: "+result[0]["Calle3"]+" NumeroExt: "+result[0]["NumeroExterior"]+" NumeroInt: "+result[0]["NumeroInterior"]+" Codigo Postal: "+result[0]["CodigoPostal"]+" Ciudad: "+result[0]["Ciudad"]+" Estado:"+result[0]['Estado']+" Nombre y Apellido: "+result[0]['NombreOpcional']+" "+result[0]['Apellido'];
            this.jsonUsuario = JSON.stringify(result);
    });
  }
  procederCompra2()
  {
    if(this.calle1 != "" && this.numExt != "" && this.numExt != "" && this.estado != "" && this.Ciudad != "" && this.codigoPostal != ""){

    this.Direccion = "Calle 1:"+this.calle1+" Calle 2: "+this.calle2+" Calle 3: "+this.calle3+" NumeroExt: "+this.numExt+" NumeroInt: "+this.numInterior+" Codigo Postal: "+this.codigoPost+" Ciudad: "+this.ciudad+" Estado:"+this.estado+" Nombre y Apellido:"+this.Nombre+" "+ this.Apellido;
    this.router.navigate(['Pago',this.IdProducto,this.Cantidad]);
    this._servicioCompartido.Nombre = this.Nombre;
    this._servicioCompartido.ApellidoPa = this.Apellido;
    this._servicioCompartido.Calle = this.calle1;
    this._servicioCompartido.NumeroExt = this.numExt;
    this._servicioCompartido.Ciudad = this.ciudad
    this._servicioCompartido.Estado = this.estado;
    this._servicioCompartido.CodigoPost = this.codigoPost;
    this._servicioCompartido.IdProducto = this.IdProducto;
    this._servicioCompartido.Cantidad = this.Cantidad;
    this._servicioCompartido.jsonUsuario = this.jsonUsuario;
    this._servicioCompartido.Direccion = this.Direccion;
    }
  }
}
