import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import 'rxjs/add/operator/map';
import { URLSearchParams } from "@angular/http";
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';




@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent implements OnInit {
  nombre: string;

  constructor(private http: Http,private router: Router, private location:Location,
    private _servicioCompartido : servicioCompartido) { }
  productoObjeto : producto[];
    
  Categoria : string;
  SubCategoria: string;
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;

  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;



  ngOnInit() {


    
    console.log(this.Categoria);
    console.log(this.SubCategoria);
   /* if(this.Categoria === undefined)
    {
    this.obtenerTodos()
    }*/
    //else{
     this.obtenerArticulos();
     this.obtenerSubCategorias();
    //}
 
    
  }

  obtenerArticulos(){
    this.Categoria = this._servicioCompartido.getCategoria();
    this.SubCategoria = this._servicioCompartido.getSubCategoria();
    let body = new URLSearchParams();
      
    body.append('categoria', this.Categoria);
    body.append('sub_categoria', this.SubCategoria);

    this.http.post('http://192.168.1.99/talamas/categoria.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
            console.log(result);
            this.articulosArray = result;
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

  obtenerTodos(){
    this.Categoria = this._servicioCompartido.getCategoria();
    this.SubCategoria = this._servicioCompartido.getSubCategoria();
    let body = new URLSearchParams();
      
    body.append('categoria', this.Categoria);
    body.append('sub_categoria', this.SubCategoria);

    this.http.post('http://192.168.1.99/talamas/todos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA = "";
            this.data = [];
            console.log(result);
            this.articulosArray = result;
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

  obtenerSubCategorias(){
    
    this.Categoria = this._servicioCompartido.getCategoria();
    this.SubCategoria = this._servicioCompartido.getSubCategoria();
    let body2 = new URLSearchParams();
    body2.append('categoria', this.Categoria);



    this.http.post('http://192.168.1.99/talamas/obtenerSubCategoria.php', body2)
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

  navegarCategoria(Categoria:string, SubCategoria: string){
    this.Categoria = Categoria;
    console.log(this.Categoria);
    console.log(SubCategoria);
    this._servicioCompartido.setCategoria(Categoria);
    this._servicioCompartido.setSubCategoria(SubCategoria);

    this.obtenerArticulos();


  
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

  masInformacion(nombre:string, descripcion: string, unidades: number, imagen: string){
    this.nombre = nombre;
    console.log(this.nombre);
    this.router.navigate(['venta']);
    this.productoObjeto = [{
      nombre: nombre,
      descripcion: descripcion,
      unidades: unidades,
      imagen: imagen,
  }]
  this._servicioCompartido.setProductoData(this.productoObjeto);
  
  }

}
