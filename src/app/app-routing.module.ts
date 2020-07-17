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
import { CompraComponent } from './componentes/compra/compra/compra.component';

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
  {path: 'Pago', component: MetodoPagoComponent,},
  {path: 'Datos/Venta', component:CompraComponent,}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
