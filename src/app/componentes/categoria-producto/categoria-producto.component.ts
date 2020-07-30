import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import 'rxjs/add/operator/map';
import { URLSearchParams } from "@angular/http";
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { FormGroup, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent implements OnInit {
  nombre: string;
  cadena: string;
  registroForm: FormGroup;

  constructor(private http: Http,private router: Router, private location:Location,
    public _servicioCompartido : servicioCompartido, private fb:FormBuilder, private Route:ActivatedRoute) {   
      this.registroForm = fb.group({
        'cadena' : this.cadena

   });}
  productoObjeto : producto[];
  Logo : string;
    
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
    this._servicioCompartido.comprobarUsuario();
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.SubCategoria = this.Route.snapshot.paramMap.get('subcategoria');
    if(this.Categoria == "Instrumentos")
    {
      this.Logo = "assets/libreriaLogo.jpg";

    }else{
      this.Logo = "assets/logoLibreria.jpg";

    }


    
    console.log(this.Categoria);
    console.log(this.SubCategoria);
    if(this.Categoria === undefined){
      this.obtenerTodos();

    }
    else if(this.Categoria == "Libros" && this.SubCategoria === "")
    {
    this.obtenerCategoria()
    this.obtenerSubCategorias();
    }
    else if( this.Categoria == "Instrumentos" && this.SubCategoria === "")
    {
     this.obtenerCategoria();
     this.obtenerSubCategorias();
    }
    else{
      this.obtenerArticulos();
      this.obtenerSubCategorias();
    }
 
    
  }

  obtenerTodos(){

    let body = new URLSearchParams();

      


    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/todos.php', body)
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

  obtenerArticulos(){
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.SubCategoria = this.Route.snapshot.paramMap.get('subcategoria');
    let body = new URLSearchParams();
      
    body.append('categoria', this.Categoria);
    body.append('sub_categoria', this.SubCategoria);

    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/categoria.php', body)
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

  obtenerCategoria(){

    let body = new URLSearchParams();
    body.append('categoria', this.Categoria);

      


    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerCategoriaEspecifica.php', body)
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
    
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    this.SubCategoria = this.Route.snapshot.paramMap.get('subcategoria');
    let body2 = new URLSearchParams();
    body2.append('categoria', this.Categoria);



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

  navegarCategoria(Categoria:string, SubCategoria: string){
    this.router.navigate(['categoria',Categoria,SubCategoria])
    this.Categoria = this.Route.snapshot.paramMap.get('categoria');
    console.log(this.Categoria);
    console.log(SubCategoria);
    if(this.Categoria == "Instrumentos")
    {
      this.Logo = "assets/libreriaLogo.jpg";

    
    }else{
      this.Logo = "assets/logoLibreria.jpg";

    }
    if(Categoria == "Libros" && SubCategoria == "")
    {
    this.obtenerCategoria()
    this.obtenerSubCategorias();
    }
    else if(Categoria == "Instrumentos" && SubCategoria == "")
    {
     this.obtenerCategoria();
     this.obtenerSubCategorias();
    }
    else{
      this.obtenerArticulos();
      this.obtenerSubCategorias();
    }
 
  }
  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }


  
  navegarInicio()
  {
    localStorage.setItem('Nombre', 'Miguel Antonio');
    this.router.navigate(['']);
    
  }
  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
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

  masInformacion(IdProducto: string){
    this.nombre = IdProducto;
    console.log(this.nombre);
    this.router.navigate(['venta',this.Categoria,IdProducto]);
    this._servicioCompartido.setIdProducto(IdProducto);
    this._servicioCompartido.setCategoria(this.Categoria);
  
  }

}
