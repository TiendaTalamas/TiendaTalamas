import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { Http,Response} from '@angular/http';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    }
    else
    {

      this.EoF = false;
    }
    this.obtenerSubCategoriasLibros();
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

  navegarPublicidad()
  {
    this.router.navigate(['emd'])
  }
  navegarMusica()
  {
    this.router.navigate(['musica'])
  }

  navegarBusqueda()
  {
    this.router.navigate(['busqueda'])
  }

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
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
