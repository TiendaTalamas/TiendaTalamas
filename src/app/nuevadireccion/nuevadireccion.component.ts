import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import { Http, Response } from '@angular/http';
import {Location} from "@angular/common"
@Component({
  selector: 'app-nuevadireccion',
  templateUrl: './nuevadireccion.component.html',
  styleUrls: ['./nuevadireccion.component.css']
})
export class NuevadireccionComponent implements OnInit {

  formData:FormGroup
  calle1:string;
  calle2:string;
  calle3:string;
  colonia:string;
  numExt:string;
  numInterior:string;
  codigoPost:string;
  ciudad:string;
  gustos:string;


  constructor(private router: Router, private location:Location,private fb: FormBuilder,private http: Http, fb2: FormBuilder,public _servicioCompartido: servicioCompartido) {
    this.formData = fb.group({
      'calle1' : this.calle1,
      'calle2' : this.calle2,
      'calle3' :this.calle3,
      'colonia' : this.colonia,
      'numExt' : this.numExt,
      'numInterior' : this.numInterior,
      'codigoPost' : this.codigoPost,
      'estado' : this.estado,
      'ciudad': this.ciudad,
      'gustos' : this.gustos
    });
   }  estado:string;
  nuevoLaredo:boolean;
  onChange(Estado:string) {
    if(Estado == "TAM" )
    {
      this.nuevoLaredo = true;
    }else{
      this.nuevoLaredo = false;
    }
 }

  ngOnInit() {
  }

}
