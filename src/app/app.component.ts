import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  //Datos Slider
  AA_slider: string;
  data_slider: any[];
  val_slider: any[];
  contenedor_slider: string;
  xxxMap_slider = new Map();
  valuesKeys_slider = new Array;
  articulosArray_slider = new Array;

  constructor(private router: Router, private location:Location,private http: Http)

  
  
  {}
  ngOnInit()
  {
    this.obtenerSlider();

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
  title = 'talamas';


    //Obteniendo datos
    obtenerSlider() {
      let body = new URLSearchParams();
      this.http.post('http://192.168.1.99/talamas/slider.php', body)
      .map((res:Response) => res.json())
              .subscribe(result => 
              {
              this.AA_slider = "";
              this.data_slider = [];
              console.log(result);
              this.articulosArray_slider = result;
              for (var key in result) {
              this.AA_slider = this.AA_slider + key;
              if (result.hasOwnProperty(key)) {
                this.val_slider = result[key];
                this.data_slider.push(Object.keys(this.val_slider));
                for (var i = 0; i < Object.keys(this.val_slider).length; i++) {
                this.contenedor_slider = Object.keys(this.val_slider)[i];
                Object.entries(this.val_slider)[i]
                 
                  this.xxxMap_slider.set(Object.keys(this.val_slider)[i], Object.values(this.val_slider)[i]);
                  this.valuesKeys_slider.push(Object.keys(this.val_slider)[i], Object.values(this.val_slider)[i]);
  
                  }
               }
            }
      });
    }
}
