import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { servicioCompartido } from '../../servicios/servicioCompartido';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http,Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
@Component({
  selector: 'app-imprenta',
  templateUrl: './imprenta.component.html',
  styleUrls: ['./imprenta.component.css']
})
export class ImprentaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  masInformacion(IdProducto: string, Categoria: string){

    this.router.navigate(['venta',Categoria,IdProducto]);
   }
}
