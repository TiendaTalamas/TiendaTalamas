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
import { MaterialModule} from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { DatosPagoComponent } from './componentes/datos-pago/datos-pago.component';
import { PagoComponent } from './componentes/pago/pago.component';
import { HistoriaComponent } from './historia/historia.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { ImprentaComponent } from './componentes/imprenta/imprenta.component';
import { VendedorGenericoComponent } from './componentes/vendedor-generico/vendedor-generico.component';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';
import { ZoomComponent } from './zoom.component';
import { AcercaComponent } from './acerca/acerca.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AcrilicoComponent } from './componentes/acrilico/acrilico.component';
import { DatosPagoIndividualesComponent } from './componentes/datos-pago-individuales/datos-pago-individuales.component';
import { TarjetaComponent } from './componentes/tarjeta/tarjeta.component';
import { NgFallimgModule } from 'ng-fallimg';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { ConfirmacionPedidoComponent } from './confirmacion-pedido/confirmacion-pedido.component';
import { ConfirmacionIndividualComponent } from './componentes/confirmacion-individual/confirmacion-individual.component';
import { PasswordComponent } from './password/password.component';
import { RestablecerComponent } from './restablecer/restablecer.component'


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
    DatosPagoComponent,
    PagoComponent,
    HistoriaComponent,
    JuegosComponent,
    ImprentaComponent,
    VendedorGenericoComponent,
    MisionComponent,
    VisionComponent,
    ZoomComponent,
    AcercaComponent,
    ContactoComponent,
    AcrilicoComponent,
    DatosPagoIndividualesComponent,
    TarjetaComponent,
    DetallesPedidoComponent,
    ConfirmacionPedidoComponent,
    ConfirmacionIndividualComponent,
    PasswordComponent,
    RestablecerComponent,
   
  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgFallimgModule.forRoot({
      default: 'https://tiendatalamas.com/assets/Disponible.jpg'
    })
  ],
  providers: [
    servicioCompartido,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
