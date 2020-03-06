import {Injectable} from '@angular/core';
import { producto } from './producto';

@Injectable()
export class servicioCompartido{
  productoData : producto[];
  Categoria : string;
  SubCategoria : string;
  IdProducto: string;
  
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


}