import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Contenedor1Component} from './componentes/contenedor1/contenedor1.component'
import {CardComponent} from './componentes/card/card.component'
import {RegistroComponent} from './componentes/registro/registro.component'
import {LibreriaComponent} from './componentes/libreria/libreria.component'
import {VentaLibroComponent} from './componentes/venta-libro/venta-libro.component'
import {EMDComponent} from './componentes/emd/emd.component'
import {MusicaComponent} from './componentes/musica/musica.component'
import {CategoriaProductoComponent} from './componentes/categoria-producto/categoria-producto.component'
import {BusquedaComponent} from './componentes/busqueda/busqueda.component'
<<<<<<< HEAD
import {CarritoComponent} from './componentes/carrito/carrito.component'
=======
import {ConfiguracionUsuarioComponent} from './componentes/configuracion-usuario/configuracion-usuario.component'
>>>>>>> 71d0675cc548bb7b6083be0af8a005f01745f986

const routes: Routes = [
  {path: '', component: Contenedor1Component, },
  {path: 'card', component: CardComponent, },
  {path: 'registro', component: RegistroComponent, },
  {path: 'libreria', component: LibreriaComponent, },
  {path: 'venta', component: VentaLibroComponent, },
  {path: 'emd', component: EMDComponent, },
  {path: 'musica', component: MusicaComponent,},
  {path: 'categoria', component: CategoriaProductoComponent,}, 
  {path: 'busqueda', component: BusquedaComponent,},
<<<<<<< HEAD
  {path: 'carrito', component: CarritoComponent,},
=======
  {path: 'ConfiguracionUsuario', component: ConfiguracionUsuarioComponent,},
>>>>>>> 71d0675cc548bb7b6083be0af8a005f01745f986


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
