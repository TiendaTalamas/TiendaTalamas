import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Router} from "@angular/router"
import { servicioCompartido } from 'src/app/servicios/servicioCompartido';
import { Http, Response } from '@angular/http';
import {Location} from "@angular/common"
import { validateVerticalPosition } from '@angular/cdk/overlay';
@Component({
  selector: 'app-nuevadireccion',
  templateUrl: './nuevadireccion.component.html',
  styleUrls: ['./nuevadireccion.component.css']
})
export class NuevadireccionComponent implements OnInit {

  formData:FormGroup
  calle1= new FormControl('',Validators.minLength(1));
  calle2= new FormControl('',Validators.minLength(1));
  calle3= new FormControl('',Validators.minLength(1));
  colonia= new FormControl('',Validators.minLength(1));
  numExt= new FormControl('',Validators.minLength(1));
  numInterior= new FormControl('',Validators.minLength(1));
  codigoPost = new FormControl('',Validators.minLength(1));
  ciudad = new FormControl('',Validators.minLength(1));
  estado = new FormControl('',Validators.minLength(1));


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
    });
   }  
  nuevoLaredo:boolean;
  nuevoLeon:boolean;
  onChange(Estado:string) {
    if(this.estado.value == "TAM" )
    {
      this.nuevoLaredo = true;
    }else{
      this.nuevoLaredo = false;
    }
    if(this.estado.value == "NLE"){
      this.nuevoLeon = true;
    }else{
      this.nuevoLeon = false;
    }
 }
 cambiarDireccion()
 {
   let body = new URLSearchParams();
 
   body.append('token', localStorage.getItem('Token'));
   body.append('calle1', this.calle1.value);
   body.append('calle2', this.calle2.value);
   body.append('numero', this.numExt.value);
   body.append('colonia', this.colonia.value);
   body.append('codigoPostal', this.codigoPost.value);
   body.append('ciudad', this.ciudad.value);
   body.append('estado', this.estado.value);
   body.append('pais', this.calle1.value);



  
   this.http.post(this._servicioCompartido.Url+'/agregarDireccion.php', body)
   .map((res:Response) => res.text())
           .subscribe(result => 
             {
               if(result == "OK")
               {
                 alert("Cambio realizado correctamente");
               }
               else if(result == "ERROR")
               {
                 alert("ERROR")
               }
   });

   
 }

  ngOnInit() {
    this.nuevoLaredo = false;
  }



}
