import {Injectable} from '@angular/core';
import { producto } from './producto';

@Injectable()
export class servicioCompartido{
  productoData : producto[];

    setProductoData(data: producto[]) {    
        this.productoData= data;        
    }
    getProductoData() {
        return this.productoData;
    }

}