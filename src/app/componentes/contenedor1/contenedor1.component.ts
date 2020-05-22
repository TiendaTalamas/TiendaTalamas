import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormBuilder, FormGroup } from '@angular/forms';

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


  
    //Datos Slider
    AA_slider: string;
    data_slider: any[];
    val_slider: any[];
    contenedor_slider: string;
    xxxMap_slider = new Map();
    valuesKeys_slider = new Array;
    articulosArray_slider = new Array;

  //Datos Articulos mas Vendidos
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;

  //Datos Ofertas
  AA_Ofertas: string;
  data_Ofertas: any[];
  val_Ofertas: any[];
  contenedor_Ofertas: string;
  xxxMap_Ofertas = new Map();
  valuesKeys_Ofertas = new Array;
  articulosArray_Ofertas = new Array;

  //datos recientes
   AA_Recientes_Libros: string;
   data_Recientes_Libros: any[];
   val_Recientes_Libros: any[];
   contenedor_Recientes_Libros: string;
   xxxMap_Recientes_Libros = new Map();
   valuesKeys_Recientes_Libros = new Array;
   articulosArray_Recientes_Libros = new Array;

   //Datos Recomendados
    AA_Recomendados: string;
    data_Recomendados: any[];
    val_Recomendados: any[];
    contenedor_Recomendados: string;
    xxxMap_Recomendados = new Map();
    valuesKeys_Recomendados = new Array;
    articulosArray_Recomendados = new Array;

    //Arrays para libros
    articulosArray_Recientes_Libros2 = new Array;
    articulosArray_Recientes_Libros3 = new Array;

    //Arrays para Instrumentos
    articulosArray_Vendidos_Instrumentos = new Array;
    articulosArray_Vendidos_Instrumentos2 = new Array;
    articulosArray_Vendidos_Instrumentos3 = new Array;

    //datos Celualar
   AA_Celualar: string;
   data_Celular: any[];
   val_Celular: any[];
   contenedor_Celular: string;
   xxxMap_Celular = new Map();
   valuesKeys_Celular = new Array;
   articulosArray_Celular = new Array;

   //datos libros vendidos
   articulosArray_Vendidos_Libros = new Array;
   articulosArray_Vendidos_Libros2 = new Array;
   articulosArray_Vendidos_Libros3 = new Array;









  constructor(private http: Http,private router: Router,private fb: FormBuilder, private location:Location,
    public _servicioCompartido : servicioCompartido){   
       this.registroForm = fb.group({
         'cadena' : this.cadena

    });}


  ngOnInit() {
    this.obtenerArticulos();
    this.obtenerOfertas();
    //Productos Libros
    this.LimiteI = "0";
    this.obtenerVendidos();
    this.obtenerRecientes()
    this.obtenerMasVendidosInstrumentos();
    this.LimiteI = "6";
    this.obtenerRecientes()
    this.obtenerVendidos();
    this.obtenerMasVendidosInstrumentos();
    this.LimiteI = "12";
    this.obtenerRecientes()
    this.obtenerVendidos();
    this.obtenerMasVendidosInstrumentos();
    this.obtenerLibrosCelular()


    this.obtenerRecomendados();
    this.obtenerSlider();
    this._servicioCompartido.comprobarUsuario();
    localStorage.clear()
    console.log("HOla la verga");
    
    
 


  }

  //Obteniendo datos
  obtenerArticulos() {
    let body = new URLSearchParams();
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/articulosVendidos.php', body)
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
//Metodo para obtener Ofertas
  obtenerOfertas() {
    let body = new URLSearchParams();
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/ofertas.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Ofertas = "";
            this.data_Ofertas = [];
            console.log(result);
            this.articulosArray_Ofertas = result;
            for (var key in result) {
            this.AA_Ofertas = this.AA_Ofertas + key;
            if (result.hasOwnProperty(key)) {
              this.val_Ofertas = result[key];
              this.data_Ofertas.push(Object.keys(this.val_Ofertas));
              for (var i = 0; i < Object.keys(this.val_Ofertas).length; i++) {
              this.contenedor_Ofertas = Object.keys(this.val_Ofertas)[i];
              Object.entries(this.val_Ofertas)[i]
               
                this.xxxMap_Ofertas.set(Object.keys(this.val_Ofertas)[i], Object.values(this.val_Ofertas)[i]);
                this.valuesKeys_Ofertas.push(Object.keys(this.val_Ofertas)[i], Object.values(this.val_Ofertas)[i]);

                }
             }
          }
    });
  }
   //Metodo para obtener recientes
  obtenerVendidos() {
    if(this.LimiteI == "0")
    {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }else if(this.LimiteI == "6")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros2 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }
  else if(this.LimiteI == "12")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerLibroVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Libros3 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }

  }
  obtenerRecientes() {
    if(this.LimiteI == "0")
    {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerLibroReciente.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Recientes_Libros = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }else if(this.LimiteI == "6")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerLibroReciente.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Recientes_Libros2 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }
  else if(this.LimiteI == "12")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerLibroReciente.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Recientes_Libros3 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }

  }

  obtenerLibrosCelular()
  {
    let body = new URLSearchParams();
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/obtenerLibroCelular.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Celualar = "";
            this.data_Celular = [];
            console.log(result);
            this.articulosArray_Celular = result;
            for (var key in result) {
            this.AA_Celualar = this.AA_Celualar + key;
            if (result.hasOwnProperty(key)) {
              this.val_Celular = result[key];
              this.data_Celular.push(Object.keys(this.val_Celular));
              for (var i = 0; i < Object.keys(this.val_Celular).length; i++) {
              this.contenedor_Celular = Object.keys(this.val_Celular)[i];
              Object.entries(this.val_Celular)[i]
               
                this.xxxMap_Celular.set(Object.keys(this.val_Celular)[i], Object.values(this.val_Celular)[i]);
                this.valuesKeys_Celular.push(Object.keys(this.val_Celular)[i], Object.values(this.val_Celular)[i]);

                }
             }
          }
    });

  }

  obtenerRecomendados() {
    let body = new URLSearchParams();
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/recomendados.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recomendados = "";
            this.data_Recomendados = [];
            console.log(result);
            this.articulosArray_Recomendados = result;
            for (var key in result) {
            this.AA_Recomendados = this.AA_Recomendados + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recomendados = result[key];
              this.data_Recomendados.push(Object.keys(this.val_Recomendados));
              for (var i = 0; i < Object.keys(this.val_Recomendados).length; i++) {
              this.contenedor = Object.keys(this.val_Recomendados)[i];
              Object.entries(this.val_Recomendados)[i]
               
                this.xxxMap_Recomendados.set(Object.keys(this.val_Recomendados)[i], Object.values(this.val_Recomendados)[i]);
                this.valuesKeys_Recomendados.push(Object.keys(this.val_Recomendados)[i], Object.values(this.val_Recomendados)[i]);

                }
             }
          }
    });
  }

  masInformacion(IdProducto: string, Categoria: string){
    this.nombre = IdProducto;
    console.log(this.nombre);
    this.router.navigate(['venta']);
    this._servicioCompartido.setIdProducto(IdProducto);
    this._servicioCompartido.setCategoria(Categoria);

   }

   //Obteniendo datos
   obtenerSlider() {
    let body = new URLSearchParams();
    this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/slider.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_slider = "";
            this.data_slider = [];
            console.log(result);
            this.articulosArray_slider = result;
            for (var key in result) {
            this.AA = this.AA_slider + key;
            if (result.hasOwnProperty(key)) {
              this.val_slider = result[key];
              this.data_slider.push(Object.keys(this.val_slider));
              for (var i = 0; i < Object.keys(this.val_slider).length; i++) {
              this.contenedor = Object.keys(this.val_slider)[i];
              Object.entries(this.val_slider)[i]
               
                this.xxxMap_slider.set(Object.keys(this.val_slider)[i], Object.values(this.val_slider)[i]);
                this.valuesKeys_slider.push(Object.keys(this.val_slider)[i], Object.values(this.val_slider)[i]);

                }
             }
          }
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
  navegarBusqueda()
  {
    this._servicioCompartido.setCadena(this.cadena);
    console.log(this.cadena);
    this.router.navigate(['busqueda'])
  }


  obtenerMasVendidosInstrumentos() {
    if(this.LimiteI == "0")
    {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://192.168.1.99/talamas/obtenerInstrumentoVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Instrumentos = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }else if(this.LimiteI == "6")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://192.168.1.99/talamas/obtenerInstrumentoVendidos.php', body)
    .map((res:Response) => res.json()) 
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Vendidos_Instrumentos2 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });
  }
  else if(this.LimiteI == "12")
  {
    let body = new URLSearchParams();
    body.append('limiteI', this.LimiteI);
    this.http.post('http://192.168.1.99/talamas/obtenerInstrumentoVendidos.php', body)
    .map((res:Response) => res.json())
            .subscribe(result => 
            {
            this.AA_Recientes_Libros = "";
            this.data_Recientes_Libros = [];
            console.log(result);
            this.articulosArray_Recientes_Libros3 = result;
            for (var key in result) {
            this.AA_Recientes_Libros = this.AA_Recientes_Libros + key;
            if (result.hasOwnProperty(key)) {
              this.val_Recientes_Libros= result[key];
              this.data_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros));
              for (var i = 0; i < Object.keys(this.val_Recientes_Libros).length; i++) {
              this.contenedor_Recientes_Libros = Object.keys(this.val_Recientes_Libros)[i];
              Object.entries(this.val_Recientes_Libros)[i]
               
                this.xxxMap_Recientes_Libros.set(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);
                this.valuesKeys_Recientes_Libros.push(Object.keys(this.val_Recientes_Libros)[i], Object.values(this.val_Recientes_Libros)[i]);

                }
             }
          }
    });

  }

  }
}


