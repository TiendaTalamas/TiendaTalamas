import { Component, OnInit, Input } from '@angular/core';
//Importando los servicios para obtener los datos del producto
import {servicioCompartido} from '../../servicios/servicioCompartido';
import { producto } from '../../servicios/producto';
@Component({
  selector: 'app-venta-libro',
  templateUrl: './venta-libro.component.html',
  styleUrls: ['./venta-libro.component.css']
})
export class VentaLibroComponent implements OnInit {
  //array para guardar los valores
  productos: any[];
  constructor(private _servicioCompartido : servicioCompartido) { }

  ngOnInit() {
    this.productos = this._servicioCompartido.getProductoData();  
  }

}
