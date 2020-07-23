import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/componentes/inicio/inicio.component';
import { Contenedor1Component } from './componentes/contenedor1/contenedor1.component';
import { CardComponent } from './componentes/card/card.component';
import {HttpModule, RequestOptions, XHRBackend, Http} from "@angular/http";
import { RegistroComponent } from './componentes/registro/registro.component';
import { LibreriaComponent } from './componentes/libreria/libreria.component';
import { VentaLibroComponent } from './componentes/venta-libro/venta-libro.component';

//Importando los servicios
import { producto } from './servicios/producto';
import { servicioCompartido } from './servicios/servicioCompartido';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { EMDComponent } from './componentes/emd/emd.component';
import { MusicaComponent } from './componentes/musica/musica.component';
import { CategoriaProductoComponent } from './componentes/categoria-producto/categoria-producto.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { ConfiguracionUsuarioComponent } from './componentes/configuracion-usuario/configuracion-usuario.component';
import { MetodoPagoComponent } from './componentes/metodo-pago/metodo-pago.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { CompraComponent } from './componentes/compra/compra/compra.component';
import { ExitosaComponent } from './exitosa/exitosa.component';
import { CuadroExitosoComponent } from './componentes/CuadroExitoso/cuadro-exitoso/cuadro-exitoso.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Contenedor1Component,
    CardComponent,
    RegistroComponent,
    LibreriaComponent,
    VentaLibroComponent,
    EMDComponent,
    MusicaComponent,
    CategoriaProductoComponent,
    BusquedaComponent,
    ConfiguracionUsuarioComponent,
    MetodoPagoComponent,
    CarritoComponent,
    CompraComponent,
    ExitosaComponent,
    CuadroExitosoComponent,
   
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    servicioCompartido,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
