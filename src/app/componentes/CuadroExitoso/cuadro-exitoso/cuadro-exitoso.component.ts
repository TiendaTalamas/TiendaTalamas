import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { Http,Response} from '@angular/http';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import { FormGroup, FormBuilder } from '@angular/forms';
import { URLSearchParams } from "@angular/http";

@Component({
  selector: 'app-cuadro-exitoso',
  templateUrl: './cuadro-exitoso.component.html',
  styleUrls: ['./cuadro-exitoso.component.css']
})
export class CuadroExitosoComponent implements OnInit {
  ventaforma:FormGroup;
  cadena:string;
  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;
  articulosArray_Inst = new Array;
  MensajeError:string;
  IdCompra:string;
  IdProducto:string;
  CostoTotal:string;
  NombreProducto:string;
  constructor(private router:Router,private http:Http, private route:ActivatedRoute, public _servicioCompartido:servicioCompartido, private fb:FormBuilder){   
    this.ventaforma = fb.group({
      'cadena' : this.cadena

 });}
  respuesta:string;
  EoF:boolean;
  ngOnInit() {
    this.respuesta = this.route.snapshot.paramMap.get('Exito');
    console.log(this.respuesta);
    if(this.respuesta == "Exito")
    {
      this.EoF = true;
      this.IdCompra = this.route.snapshot.paramMap.get('Mensaje');
      this.obtenerCompra();
    }
    else
    {
      this.EoF = false;
      this.MensajeError = this.route.snapshot.paramMap.get('Mensaje');
    }
    this.obtenerSubCategoriasLibros();
    this._servicioCompartido.comprobarUsuario();
  }
  navegarDetalles(){
    this.router.navigate(['DetallesPedido',this._servicioCompartido.IdPedido]);
  }
  obtenerCompra()
  {
    let body = new URLSearchParams();
    body.append('token', localStorage.getItem('Token'));
    body.append('idCompra', this.IdCompra);


    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/detallesDeCompra.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {

                  this.IdProducto = result['IdProducto'];
                  this.CostoTotal = result['Precio'];
                  this.NombreProducto = result['NombreProducto'];
                  console.log(result);
              });
            
  }

  navegarCategoria(Categoria:string, SubCategoria: string){

    console.log(SubCategoria);
    this.router.navigate(['categoria',Categoria,SubCategoria]);

  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
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

  navegarHistorial()
  {
    this.router.navigate(['historial']);
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

  obtenerSubCategoriasLibros(){
    
    
    let body2 = new URLSearchParams();
    body2.append('categoria', "Libros");



    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerSubCategoria.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            console.log(result);
            this.articulosArray_Sub = result;
            for (var key in result) {
            this.AA_Sub = this.AA_Sub + key;
            if (result.hasOwnProperty(key)) {
              this.val_Sub = result[key];
              this.data_Sub.push(Object.keys(this.val_Sub));
              for (var i = 0; i < Object.keys(this.val_Sub).length; i++) {
              this.contenedor_Sub = Object.keys(this.val_Sub)[i];
              Object.entries(this.val_Sub)[i]
               
                this.xxxMap_Sub.set(Object.keys(this.val_Sub)[i], Object.values(this.val_Sub)[i]);
                this.valuesKeys_Sub.push(Object.keys(this.val_Sub)[i], Object.values(this.val_Sub)[i]);

                }
             }
          }
    });
  }
}
