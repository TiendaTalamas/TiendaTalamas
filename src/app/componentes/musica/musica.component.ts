import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http,Response } from '@angular/http';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {
  registroForm: FormGroup;
  cadena:string;
  articulosArray_Vendidos_Libros = new Array;
  articulosArray = new Array;

  
  constructor(private router: Router, public _servicioCompartido: servicioCompartido, private fb: FormBuilder, private http: Http) {   
    this.registroForm = fb.group({
      'cadena' : this.cadena

 });}
  Categoria : string;
  respuesta: string;

  navegarCategoria(Categoria:string, SubCategoria: string){
    this.Categoria = Categoria;
    console.log(this.Categoria);
    console.log(SubCategoria);
    this.router.navigate(['categoria']);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
  }
  ngOnInit() {
    this._servicioCompartido.comprobarUsuario();

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

  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }

  masInformacion(IdProducto: string, Categoria: string){

    this.router.navigate(['venta',Categoria,IdProducto]);
   }

   anadirAlCarrito(IdProducto:string)
   {
     let body = new URLSearchParams();
     body.append("IdProducto",IdProducto);
     body.append("Cantidad", "1");
     body.append("token",localStorage.getItem('Token'))
     
     this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/agregarCarrito.php', body)
     .map((res:Response) => res.text())
             .subscribe(result => 
             {
               this.respuesta=result;
     });
 
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

  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
  }

  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }
}
