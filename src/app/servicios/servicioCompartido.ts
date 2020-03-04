import {Injectable} from '@angular/core';
import { producto } from './producto';

@Injectable()
export class servicioCompartido{
  productoData : producto[];
  Categoria : string
  
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


}