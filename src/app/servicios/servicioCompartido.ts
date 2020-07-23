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
  NumeroTel:String;
  email:String;
  Imagen:string;

  productoData : producto[];
  Categoria : string;
  SubCategoria : string;
  IdProducto: string;
  Cadena: string;

  CompUsuario: boolean;
  contrasena: string;
  usuario: string;
  miJson: JSON;
  constructor(private http: Http, private router: Router) {}   
  comprobarUsuario() 
  {
      let body = new URLSearchParams();
     body.append('token', localStorage.getItem('Token'));



  this.http.post('http://emdpublicidad.com/tiendatalamas/archivos/php/comprobarSesion.php', body)
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
    
        
    }

}