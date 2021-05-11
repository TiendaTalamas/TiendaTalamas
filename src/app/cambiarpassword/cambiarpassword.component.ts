import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { servicioCompartido } from './../servicios/servicioCompartido';

@Component({
  selector: 'app-cambiarpassword',
  templateUrl: './cambiarpassword.component.html',
  styleUrls: ['./cambiarpassword.component.css']
})
export class CambiarpasswordComponent implements OnInit {

  constructor(public _servicioCompartido:servicioCompartido, private http:Http) { }
  antiguaContrasena = new FormControl('', Validators.minLength(8));
  nuevaContrasena = new FormControl('',Validators.minLength(8));
  repiteContrasena = new FormControl('',Validators.minLength(8));
 
  cambiarContrasena(){
    let body = new URLSearchParams();
  
    body.append('token', localStorage.getItem('Token'));
    body.append('contrasenaActual', this.antiguaContrasena.value);
    body.append('contrasenaNueva', this.nuevaContrasena.value);
    body.append('contrasenaRepetida', this.repiteContrasena.value);
  
   console.log(this.antiguaContrasena.value);
   console.log(this.nuevaContrasena.value);
   console.log(this.antiguaContrasena.value);
    this.http.post(this._servicioCompartido.Url+'/CambiarContrasena.php', body)
    .map((res:Response) => res.text())
            .subscribe(result => 
              {
                console.log(result)   ;
                if(result == "OK")
                {
                  alert("Cambio realizado correctamente");
                  this.antiguaContrasena.setValue("");
                  this.nuevaContrasena.setValue("");
                  this.repiteContrasena.setValue("");
                }
                else
                {
                  alert("Fallo");
                }
    });

 }
  ngOnInit() {
  }

}
