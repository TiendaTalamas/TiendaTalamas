import {Injectable} from '@angular/core';
import { producto } from './producto';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';

@Injectable()
export class servicioCompartido{
  Nombre:string;
  ApellidoPa:string;
  ApellidoMa:string;
  NumeroTel:string;
  email:string;
  Imagen:string;
  soloBusqueda:boolean;
  productoData : producto[];
  Categoria : string;
  SubCategoria : string;
  IdProducto: string;
  Cadena: string;
  soloRegistro:boolean;
  Cantidad:string;
  CompUsuario: boolean;
  contrasena: string;
  usuario: string;
  Cond1:boolean;
  Cond2:boolean;
  jsonUsuario:string;
  Direccion:string;
  Url = "https://www.tiendatalamas.com/archivos/php";
  constructor(private http: Http, private router: Router) {}   
  comprobarUsuario() 
  {
      let body = new URLSearchParams();
     body.append('token', localStorage.getItem('Token'));



  this.http.post(this.Url+'/comprobarSesion.php', body)
  .map((res:Response) => res.json())
          .subscribe(result => 
            {
                if(result['status'] == "400")
                {
                    console.log(result);
                    this.cerrarSesion();
                    this.CompUsuario = false;
                }
                else
                {
                    this.CompUsuario = true;
                    console.log(result);
                }
  });
  } 

  soloLogueado() 
  {
      let body = new URLSearchParams();
     body.append('token', localStorage.getItem('Token'));



  this.http.post(this.Url+'/comprobarSesion.php', body)
  .map((res:Response) => res.json())
          .subscribe(result => 
            {
                if(result['status'] == "400")
                {
                    this.router.navigate(['']);
                }
                else
                {

                }
  });
  } 


  soloSinLoguear() 
  {
      let body = new URLSearchParams();
     body.append('token', localStorage.getItem('Token'));



  this.http.post(this.Url+'/comprobarSesion.php', body)
  .map((res:Response) => res.json())
          .subscribe(result => 
            {
                if(result['status'] == "400")
                {
                }
                else
                {
                    this.router.navigate(['']);
                }
  });
  } 

    setsoloBusqueda(soloBusqueda:boolean)
    {
        this.soloBusqueda = soloBusqueda;
    }

    setProductoData(data: producto[]) {    
        this.productoData= data;        
    }
    getProductoData() {
        return this.productoData;
    }

    setCategoria(Categoria: string) {    
        this.Categoria= Categoria;        
    }
    getCategoria() {    
       return this.Categoria;        
    }

    setSubCategoria(SubCategoria: string) {    
        this.SubCategoria= SubCategoria;        
    }
    getSubCategoria() {    
       return this.SubCategoria;        
    }

    setIdProducto(IdProducto: string){
        this.IdProducto = IdProducto;

    }

    getIdProducto(){
        return this.IdProducto;
    }

    setCadena(Cadena:string){
        this.Cadena = Cadena;
    }

    getCadena(){
        return this.Cadena;
        
    }


    cerrarSesion()
    {
        localStorage.clear();
        this.comprobarUsuario();
        
    }

}