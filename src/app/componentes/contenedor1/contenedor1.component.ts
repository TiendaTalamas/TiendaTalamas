import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { Router, NavigationEnd } from '@angular/router';
import {NgFallimgModule} from 'ng-fallimg'
@Component({
  selector: 'app-contenedor1',
  templateUrl: './contenedor1.component.html',
  styleUrls: ['./contenedor1.component.css']
})
export class Contenedor1Component implements OnInit {
  //Variables auxiliares
  CompUsuario:boolean;


  nombre: string;
  productoObjeto: producto[];
  LimiteI :string;
  LimiteF :string;
  cadena: string;
  registroForm: FormGroup;
  noRegistrado:boolean;


    //Datos Slider
    articulosArray_slider = new Array;
    nuevoLaredo:boolean;
  //Datos Articulos mas Vendidos
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;

  //Datos Ofertas
  articulosArray_Ofertas = new Array;



   //Datos Recomendados
    articulosArray_Recomendados = new Array;

    //Arrays para Instrumentos
    articulosArray_Vendidos_Instrumentos = new Array;
    articulosArray_Vendidos_Instrumentos2 = new Array;
    articulosArray_Vendidos_Instrumentos3 = new Array;

    //datos Celualar
   articulosArray_Celular = new Array;

   //datos libros vendidos
   articulosArray_Vendidos_Libros = new Array;
   articulosArray_Vendidos_Libros2 = new Array;
   articulosArray_Vendidos_Libros3 = new Array;
   articulosArray_Vendidos_Libros4 = new Array;
   articulosArray_Vendidos_Libros5 = new Array;
   articulosArray_Vendidos_Libros6 = new Array;


   masVendido = new Array;
   masVendidosCelular = new Array;
   masVendidosCelular1 = new Array;
   masVendidosCelular2 = new Array;
   masVendidosCelular3 = new Array;
   masVendidosCelular4 = new Array;
   masVendidosCelular5 = new Array;
   masVendidosCelular6 = new Array;
   masVendidosCelular7 = new Array;


   articulosArray_Vendidos_Discos = new Array;
   articulosArray_Vendidos_Discos2 = new Array;
   articulosArray_Vendidos_Discos3 = new Array;
   articulosArray_Vendidos_Discos4 = new Array;
   articulosArray_Vendidos_Discos5 = new Array;
   articulosArray_Vendidos_Discos6 = new Array;
   //Para el modal
   respuesta:string;

  masVendidosTablets = new Array;
  masVendidosTablets2 = new Array;
  masVendidosTablets3 = new Array;
  masVendidosTablets4 = new Array;
  masVendidosTablets5 = new Array;
  NegociosG = new Array;
  NegociosG2 = new Array;
  NegociosS = new Array;
  NegociosS2 = new Array;
  NegociosS3 = new Array;





  constructor(private http: Http,private router: Router,private fb: FormBuilder, private location:Location,
    public _servicioCompartido : servicioCompartido, public falla:NgFallimgModule){
       this.registroForm = fb.group({
         'cadena' : this.cadena

    });}


  ngOnInit() {
    this.obtenerNegocios();
    if(localStorage.getItem("Ciudad")== "Nuevo Laredo"){
      this.nuevoLaredo = true;
    }else{
      this.nuevoLaredo = false;
    }
    this._servicioCompartido.obtenerCantidadCarrito();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
       return;
      }
      if(this._servicioCompartido.recargar){
        window.location.reload();
      }
      window.scrollTo(0, 0);
     });
    this.masVendidosTablet();
     this.masVendidosCel();
    //Productos Libros
    this.LimiteI = "0";
    this.obtenerVendidos();
    this.discosMasVendidos();
    this.LimiteI = "6";
    this.obtenerVendidos();
    this.discosMasVendidos();
    this.LimiteI = "12";
    this.obtenerVendidos();
    this.obtenerLibrosCelular();
    this.discosMasVendidos();
    this.LimiteI = "18";
    this.obtenerVendidos();
    this.obtenerLibrosCelular();
    this.discosMasVendidos();
    this.LimiteI = "24";
    this.obtenerVendidos();
    this.obtenerLibrosCelular();
    this.LimiteI = "30";
    this.obtenerVendidos();
    this.obtenerLibrosCelular();
    this.obtenerSlider();
    this._servicioCompartido.comprobarUsuario();
    this.obtenerSubCategoriasLibros();
    this.obtenerSubCategoriasInst();
  }

  AA_Sub: string;
  data_Sub: any[];
  val_Sub: any[];
  contenedor_Sub: string;
  xxxMap_Sub = new Map();
  valuesKeys_Sub = new Array;
  articulosArray_Sub = new Array;
  articulosArray_Inst = new Array;

  navegarCategoria(Categoria:string, SubCategoria: string){

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
  //Obtiene los más vendidos en las pantallas medianas
  masVendidosTablet(){
    let body = new URLSearchParams();
    body.append('limiteI', "0");
    body.append('limiteS', "4");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {
            this.masVendidosTablets = result;
    });
    body.append('limiteI', "4");
    body.append('limiteS', "4");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {
            this.masVendidosTablets2 = result;
    });
    body.append('limiteI', "8");
    body.append('limiteS', "4");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosTablets3 = result;

    });
    body.append('limiteI', "12");
    body.append('limiteS', "4");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosTablets4 = result;

    });
    body.append('limiteI', "16");
    body.append('limiteS', "4");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosTablets5 = result;

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

  discosMasVendidos()
  {
    if(this.LimiteI == "0")
    {
    let body = new URLSearchParams();
    body.append('limiteI',  "0");
    this.http.post(this._servicioCompartido.Url+'/discosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Discos = result;

    });
  }else if(this.LimiteI == "6")
  {
    let body = new URLSearchParams();
    body.append('limiteI',"6");
    this.http.post(this._servicioCompartido.Url+'/discosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Discos2 = result;

    });
  }
  else if(this.LimiteI == "12")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "12");
    this.http.post(this._servicioCompartido.Url+'/discosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Discos3 = result;

    });

  }
  else if(this.LimiteI == "18")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "18");
    this.http.post(this._servicioCompartido.Url+'/discosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Discos4 = result;

    });

  }
  }

   //Metodo para obtener recientes
   masVendidosCel(){
    let body = new URLSearchParams();
    body.append('limiteI', "0");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendido = result;

    });
    body.append('limiteI', "2");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosCelular1 = result;

    });
    body.append('limiteI', "4");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosCelular2 = result;

    });
    body.append('limiteI', "6");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosCelular3 = result;

    });
    body.append('limiteI', "8");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosCelular4 = result;

    });
    body.append('limiteI', "10");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosCelular5 = result;

    });
    body.append('limiteI', "12");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosCelular6 = result;

    });
    body.append('limiteI', "14");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosCelular7 = result;

    });
    body.append('limiteI', "16");
    body.append('limiteS', "2");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.masVendidosCelular = result;

    });
   }
  obtenerVendidos() {
    if(this.LimiteI == "0")
    {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Libros = result;

    });
  }else if(this.LimiteI == "6")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Libros2 = result;

    });
  }
  else if(this.LimiteI == "12")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post(this._servicioCompartido.Url+'/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Libros3 = result;

    });

  }
  else if(this.LimiteI == "18")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "0");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Libros4 = result;

    });

  }
  else if(this.LimiteI == "24")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "6");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.articulosArray_Vendidos_Libros5 = result;

    });

  }
  else if(this.LimiteI == "30")
  {
    let body = new URLSearchParams();
    body.append('limiteI', "12");
    this.http.post(this._servicioCompartido.Url+'/librosMasVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {
            this.articulosArray_Vendidos_Libros6 = result;
    });

  }





  }
  navegarNegocio(Negocio:string)
  {
    this.router.navigate([Negocio]);
  }
  obtenerNegocios()
  {
    let body = new URLSearchParams();
    body.append("","");
    this.http.post(this._servicioCompartido.Url+'/todosLosNegocios.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.NegociosG = result["datos"];

    });
    body = new URLSearchParams();
    body.append("limiteI","6");
    body.append("limiteS","6");
    this.http.post(this._servicioCompartido.Url+'/todosLosNegocios.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.NegociosG2 = result["datos"];

    });
    body = new URLSearchParams();
    body.append("limiteI","0");
    body.append("limiteS","3");
    this.http.post(this._servicioCompartido.Url+'/todosLosNegocios.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.NegociosS = result["datos"];

    });
    body = new URLSearchParams();
    body.append("limiteI","3");
    body.append("limiteS","3");
    this.http.post(this._servicioCompartido.Url+'/todosLosNegocios.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.NegociosS2 = result["datos"];

    });
    body = new URLSearchParams();
    body.append("limiteI","6");
    body.append("limiteS","3");
    this.http.post(this._servicioCompartido.Url+'/todosLosNegocios.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {

            this.NegociosS3 = result["datos"];

    });
  }


  obtenerLibrosCelular()
  {
    let body = new URLSearchParams();
    this.http.post(this._servicioCompartido+'/obtenerLibroCelular.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {
            this.articulosArray_Celular = result;
    });

  }
  masInformacion(IdProducto: string, Categoria: string, Nombre:string){
    this.nombre = IdProducto;
    this.router.navigate(['venta',Categoria,IdProducto,Nombre]);
   }

   //Obteniendo datos
   obtenerSlider() {
    let body = new URLSearchParams();
    this.http.post(this._servicioCompartido.Url+'/slider.php', body)
    .map((res:Response) => res.json())
            .subscribe(result =>
            {
            this.articulosArray_slider = result;
    });
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
    this.router.navigate(['libreria']);
  }

  navegarImprenta()
  {
    this.router.navigate(['Imprenta']);
  }
  navegarJuegos()
  {
    this.router.navigate(['Juegos']);
  }
  navegarAcrilicos()
  {
    this.router.navigate(['Acrilicos']);
  }
  navegarPublicidad()
  {
    this.router.navigate(['emd']);
  }
  navegarMusica()
  {
    this.router.navigate(['musica']);

  }

  navegarConfiguracion()
  {
    this.router.navigate(['ConfiguracionUsuario']);
  }

  navegarHistorial()
  {
    this.router.navigate(['historial']);
  }
  navegarBusqueda()
  {
    this.router.navigate(['busqueda',this.cadena])
  }
  navegarCarrito()
  {
    this.router.navigate(['Carrito'])
  }

  anadirAlCarrito(IdProducto:string)
  {
    let body = new URLSearchParams();
    body.append("IdProducto",IdProducto);
    body.append("Cantidad", "1");
    body.append("token",localStorage.getItem('Token'))

    this.http.post(this._servicioCompartido.Url+'/agregarCarrito.php', body)
    .map((res:Response) => res.text())
            .subscribe(result =>
            {
              this._servicioCompartido.respuesta=result;
              if(this._servicioCompartido.respuesta == "Iniciar sesion o registrarse para agregar al carrito")
              {
                this.noRegistrado= true;
              }else{
                this.noRegistrado = false;
                this._servicioCompartido.obtenerCantidadCarrito();
              }
    });

  }
}
