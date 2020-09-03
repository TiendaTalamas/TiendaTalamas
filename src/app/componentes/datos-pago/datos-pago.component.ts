import { Component, OnInit } from '@angular/core';
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
import {Router, ActivatedRoute} from "@angular/router";
import { Http , Response} from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-datos-pago',
  templateUrl: './datos-pago.component.html',
  styleUrls: ['./datos-pago.component.css']
})
export class DatosPagoComponent implements OnInit {

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
  pais:string;
  codigoPostal:string;
  Direccion:string;
  jsonUsuario:string;
  ngOnInit() {
    this.IdProducto = this.Route.snapshot.paramMap.get('id');
    this.Cantidad = this.Route.snapshot.paramMap.get('cantidad');
    this.obtenerDirecciones();
    this.comprobarArticulo();
  }
  comprobarArticulo()
  {
    if(Number(this.Cantidad) <= 0)
    {this.navegarInicio();}
    let body = new URLSearchParams();
      
    body.append('IdProducto', this.IdProducto);
    body.append('cantidad', String(this.Cantidad));

    this.http.post(this._servicioCompartido.Url+'/comprobarArticulo.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
              {
                console.log(result);
                if(result != "Existe")
                {this.navegarInicio()}

    });

  }

  navegarInicio()
  {
    this.router.navigate(['']);
    
  }
  procederCompra()
  {
    this.router.navigate(['Pago']);
    this._servicioCompartido.IdProducto = this.IdProducto;
    this._servicioCompartido.Cantidad = this.Cantidad;
    this._servicioCompartido.jsonUsuario = this.jsonUsuario;
    this._servicioCompartido.Direccion = this.Direccion;
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
            this.calle1 = result[0]["Calle"];
            this.calle2 = result[0]["Calle2"];
            this.calle3 = result[0]["Calle3"];
            this.ciudad = result[0]["Ciudad"];
            this.codigoPostal = result[0]["CodigoPostal"];
            this.numeroE = result[0]["NumeroExterior"];
            this.colonia = result[0]["Colonia"];
            this.estado = result[0]["Estado"];
            this.pais = result[0]["Pais"];
            this.Direccion = "Calle 1:"+result[0]["Calle"]+"Calle 2: "+this.calle2+" Calle 3: "+this.calle3+" NumeroExt: "+this.numeroE+" Codigo Postal: "+this.codigoPostal+" Ciudad: "+this.ciudad
            this.jsonUsuario = JSON.stringify(result);
    });
  }

}
