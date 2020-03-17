import {Injectable} from '@angular/core';
import { producto } from './producto';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";

@Injectable()
export class servicioCompartido{
  productoData : producto[];
  Categoria : string;
  SubCategoria : string;
  IdProducto: string;
  Cadena: string;

  CompUsuario: boolean;
  contrasena: string;
  usuario: string;
  miJson: JSON;
  constructor(private http: Http) {}   
  comprobarUsuario() 
  {
    var usuario;

      usuario =localStorage.getItem('email_U');
      let body = new URLSearchParams();

  body.append('email', usuario);



  this.http.post('http://192.168.1.99/talamas/comprobarSesion.php', body)
  .map((res:Response) => res.text())
          .subscribe(result => 
            {
                if(result == "OK")
                {
                 this.CompUsuario =true;

                }
                else
                {
                  this.CompUsuario=false;
                  this.cerrarSesion();

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