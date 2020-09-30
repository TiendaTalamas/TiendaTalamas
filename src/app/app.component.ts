import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { servicioCompartido } from './servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  Pag1:boolean;
  cadena: string;
  registroForm:FormGroup;
  catLibros:boolean;
  todasCat:boolean;
  catInstrumentos:boolean;
  constructor(private router: Router, private location:Location,private http: Http, public _servicioCompartido:servicioCompartido, private fb:FormBuilder, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this.registroForm = fb.group({
      'cadena' : this.cadena

 });
 this.mobileQuery = media.matchMedia('(max-width: 600px)');
 this._mobileQueryListener = () => changeDetectorRef.detectChanges();
 this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit()
  {
    this.todasCat = true;
    this.catLibros = false;
    this._servicioCompartido.comprobarUsuario();
    this.obtenerSubCategoriasLibros();
    this.obtenerSubCategoriasInst();
    this._servicioCompartido.obtenerCantidadCarrito();
  }
  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;
  articulosArray_Inst = new Array;
  AA_Buscar: string;
  data_Buscar: any[];
  val_Buscar: any[];
  contenedor_Buscar: string;
  xxxMap_Buscar = new Map();
  valuesKeys_Buscar = new Array;
  articulosArray_Buscar = new Array;

  changeCatLibros()
  {
    if(this.todasCat)
    {
      this.todasCat= false;
      this.catLibros = true;
    }else{
      this.todasCat = true;
      this.catLibros = false;
    }
  }
  changeCatInstrumentos()
  {
    if(this.todasCat)
    {
      this.todasCat= false;
      this.catInstrumentos = true;
    }else{
      this.todasCat = true;
      this.catInstrumentos = false;
    }
  }

  navegarCategoria(Categoria:string, SubCategoria: string){
    console.log(SubCategoria);

    this.router.navigate(['categoria',Categoria,SubCategoria]);
    
  this._servicioCompartido.setCategoria(Categoria);
  this._servicioCompartido.setSubCategoria(SubCategoria);

  
  }
  obtenerSubCategoriasLibros(){
    
    
    let body2 = new URLSearchParams();
    body2.append('categoria', "Libros");



    this.http.post(this._servicioCompartido.Url+'/obtenerSubCategoria.php', body2)
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

  obtenerSubCategoriasInst(){
    
    
    let body2 = new URLSearchParams();
    body2.append('categoria', "Instrumentos");



    this.http.post(this._servicioCompartido.Url+'/obtenerSubCategoria.php', body2)
    .map((res:Response) => res.json())
            .subscribe(result => 
              {
              this.AA_Sub = "";
            this.data_Sub = [];
            console.log(result);
            this.articulosArray_Inst = result;
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
  obtenerBusqueda(){
    let body = new URLSearchParams();
    body.append('cadena', this.cadena);
    this.http.post(this._servicioCompartido.Url+'/buscar.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Buscar = "";
            this.data_Buscar = [];
            console.log(result);
            this.articulosArray_Buscar = result;
            for (var key in result) {
            this.AA_Buscar = this.AA_Buscar + key;
            if (result.hasOwnProperty(key)) {
              this.val_Buscar= result[key];
              this.data_Buscar.push(Object.keys(this.val_Buscar));
              for (var i = 0; i < Object.keys(this.val_Buscar).length; i++) {
              this.contenedor_Buscar = Object.keys(this.val_Buscar)[i];
              Object.entries(this.val_Buscar)[i]
               
                this.xxxMap_Buscar.set(Object.keys(this.val_Buscar)[i], Object.values(this.val_Buscar)[i]);
                this.valuesKeys_Buscar.push(Object.keys(this.val_Buscar)[i], Object.values(this.val_Buscar)[i]);

                }
             }
          }
    });

  }
  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  
  masInformacion(IdProducto: string, Categoria: string){

    this.router.navigate(['venta',Categoria,IdProducto]);


  }
  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }
  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
    this.obtenerBusqueda();
  }
  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }
  navegarInicio()
  {
    this.router.navigate(['']);
    
  }

  navegarSesion()
  {

    this.router.navigate(['card'])


  }

  navegarSoporte()
  {
    this.router.navigate(['soporte'])
  }

  navegarPoliticas(TipoCondicion:string)
  {
    this.router.navigate(['Condiciones', TipoCondicion]);
    if(TipoCondicion == "CondicionesDeUso")
    {
      this._servicioCompartido.Cond1 = true;
      this._servicioCompartido.Cond2 = false;
    }
    else{
      this._servicioCompartido.Cond2 = true;
      this._servicioCompartido.Cond1 = false;
    }

  }
  
 
  title = 'talamas';
  
  mobileQuery: MediaQueryList;
  
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
