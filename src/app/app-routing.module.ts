import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Contenedor1Component} from './componentes/contenedor1/contenedor1.component'
import {CardComponent} from './componentes/card/card.component'
import {RegistroComponent} from './componentes/registro/registro.component'
import {LibreriaComponent} from './componentes/libreria/libreria.component'
import {VentaLibroComponent} from './componentes/venta-libro/venta-libro.component'
import {EMDComponent} from './componentes/emd/emd.component'
import {MetodoPagoComponent} from './componentes/metodo-pago/metodo-pago.component'
import {MusicaComponent} from './componentes/musica/musica.component'
import {CategoriaProductoComponent} from './componentes/categoria-producto/categoria-producto.component'
import {BusquedaComponent} from './componentes/busqueda/busqueda.component'
import {ConfiguracionUsuarioComponent} from './componentes/configuracion-usuario/configuracion-usuario.component'
import {CompraComponent } from './componentes/compra/compra/compra.component';
import {CarritoComponent} from './componentes/carrito/carrito.component';
import {CuadroExitosoComponent} from './componentes/CuadroExitoso/cuadro-exitoso/cuadro-exitoso.component';
import {DireccionComponent} from './componentes/Direccion/direccion/direccion.component';
import {PreferenciasComponent} from './componentes/Preferencia/preferencias/preferencias.component';
import {HistorialComponent} from './componentes/historial/historial/historial.component';
import {PoliticasComponent} from './componentes/politicas/politicas/politicas.component';
import {SoporteComponent} from './componentes/Soporte/soporte/soporte.component';
import { config } from 'process';
import {SidebarComponent} from './componentes/sidebar/sidebar.component';
import {PagoComponent} from './componentes/pago/pago.component';
import {DatosPagoComponent} from './componentes/datos-pago/datos-pago.component';
import { HistoriaComponent } from './historia/historia.component';
import {JuegosComponent} from './componentes/juegos/juegos.component';
import {ImprentaComponent} from './componentes/imprenta/imprenta.component';
import {MisionComponent} from './mision/mision.component';
import {VisionComponent} from './vision/vision.component';
import {VendedorGenericoComponent} from './componentes/vendedor-generico/vendedor-generico.component';
import {AcercaComponent} from './acerca/acerca.component';
import {ContactoComponent} from './contacto/contacto.component';
import {AcrilicoComponent} from './componentes/acrilico/acrilico.component';


const routes: Routes = [
  {path: '', component: Contenedor1Component, },
  {path: 'card', component: CardComponent, },
  {path: 'registro', component: RegistroComponent, },
  {path: 'libreria', component: LibreriaComponent, },
  {path: 'venta/:categoria/:id', component: VentaLibroComponent, },
  {path: 'emd', component: EMDComponent, },
  {path: 'musica', component: MusicaComponent,},
  {path: 'categoria/:categoria/:subcategoria', component: CategoriaProductoComponent,}, 
  {path: 'busqueda/:search', component: BusquedaComponent,},
  {path: 'ConfiguracionUsuario', component: ConfiguracionUsuarioComponent,},
  {path: 'Pag', component: MetodoPagoComponent,},
  {path: 'Datos/Venta/:id', component:CompraComponent,},
  {path:'Carrito', component:CarritoComponent,},
  {path:'CuadroExitoso/:Exito/:Mensaje', component:CuadroExitosoComponent,},
  {path:'Direccion', component:DireccionComponent,},
  {path:'Preferencia', component:PreferenciasComponent,},
  {path:'historial', component:HistorialComponent,},
  {path:'Condiciones/:uso', component:PoliticasComponent,},
  {path:'soporte', component:SoporteComponent,},
  {path:'Sidebar', component:SidebarComponent ,},
  {path: 'Pago', component:PagoComponent},
  {path: 'DatosDePago', component:DatosPagoComponent},
  {path: 'historia', component:HistoriaComponent},
  {path: 'Juegos', component:JuegosComponent},
  {path: 'Imprenta', component:ImprentaComponent },
  {path: 'Categoria/:nombre', component:VendedorGenericoComponent},
  {path: 'mision', component:MisionComponent},
  {path: 'vision', component:VisionComponent},
  {path: 'acerca', component:AcercaComponent},
  {path: 'contacto', component:ContactoComponent},
  {path: 'Acrilicos', component:AcrilicoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
