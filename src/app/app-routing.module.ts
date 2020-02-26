import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Contenedor1Component} from './componentes/contenedor1/contenedor1.component'
import {CardComponent} from './componentes/card/card.component'
import {RegistroComponent} from './componentes/registro/registro.component'
import {LibreriaComponent} from './componentes/libreria/libreria.component'
import {VentaLibroComponent} from './componentes/venta-libro/venta-libro.component'
import {EMDComponent} from './componentes/emd/emd.component'
import {MusicaComponent} from './componentes/musica/musica.component'


const routes: Routes = [
  {path: '', component: Contenedor1Component, },
  {path: 'card', component: CardComponent, },
  {path: 'registro', component: RegistroComponent, },
  {path: 'libreria', component: LibreriaComponent, },
  {path: 'venta', component: VentaLibroComponent, },
  {path: 'emd', component: EMDComponent, },
  {path: 'musica', component: MusicaComponent,},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
