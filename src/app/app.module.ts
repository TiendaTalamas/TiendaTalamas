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
<<<<<<< HEAD

/*Angular material*/
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

//Importando los servicios
=======
import { MaterialModule} from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> 4dd249e7bcde15e680d2862f07e03ee63854b57d
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
import { DireccionComponent } from './componentes/Direccion/direccion/direccion.component';
import { PreferenciasComponent } from './componentes/Preferencia/preferencias/preferencias.component';
import { HistorialComponent } from './componentes/historial/historial/historial.component';
import { PoliticasComponent } from './componentes/politicas/politicas/politicas.component';
import { SoporteComponent } from './componentes/Soporte/soporte/soporte.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import {
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

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
    DireccionComponent,
    PreferenciasComponent,
    HistorialComponent,
    PoliticasComponent,
    SoporteComponent,
    SidebarComponent,
   
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
=======
    MaterialModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
>>>>>>> 4dd249e7bcde15e680d2862f07e03ee63854b57d
  ],
  providers: [
    servicioCompartido,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
