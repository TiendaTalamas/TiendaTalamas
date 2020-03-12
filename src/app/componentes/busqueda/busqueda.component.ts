import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";

import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  registroForm: FormGroup;


  constructor(private http: Http,private router: Router, private location:Location,
    private _servicioCompartido : servicioCompartido, private fb:FormBuilder){   
      this.registroForm = fb.group({
        'cadena' : this.cadena
   });}
    cadena: string;
    AA_Buscar: string;
    data_Buscar: any[];
    val_Buscar: any[];
    contenedor_Buscar: string;
    xxxMap_Buscar = new Map();
    valuesKeys_Buscar = new Array;
    articulosArray_Buscar = new Array;
 

  ngOnInit() {
    this.cadena = this._servicioCompartido.getCadena();
    console.log(this.cadena);
    this.obtenerBusqueda();
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
    this._servicioCompartido.setCadena(this.cadena);
    this.cadena = this._servicioCompartido.getCadena();
    console.log(this.cadena);
    this.obtenerBusqueda();
  }

  obtenerBusqueda(){
    let body = new URLSearchParams();
    body.append('cadena', this.cadena);
    this.http.post('http://192.168.1.99/talamas/buscar.php', body)
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

}
