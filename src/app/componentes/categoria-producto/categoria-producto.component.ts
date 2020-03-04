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

  constructor(private http: Http,private router: Router, private location:Location,
    private _servicioCompartido : servicioCompartido) { }
  Categoria : string;
  SubCategoria: string;
  AA: string;
  data: any[];
  val: any[];
  contenedor: string;
  xxxMap = new Map();
  valuesKeys = new Array;
  articulosArray = new Array;
  ngOnInit() {

    this.Categoria = this._servicioCompartido.getCategoria();
    this.SubCategoria = this._servicioCompartido.getSubCategoria();
    
    console.log(this.Categoria);
    console.log(this.SubCategoria);

  

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

}
