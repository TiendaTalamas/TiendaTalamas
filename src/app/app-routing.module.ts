import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './componentes/componentes/inicio/inicio.component'
import {Contenedor1Component} from './componentes/contenedor1/contenedor1.component'
import {CardComponent} from './componentes/card/card.component'



const routes: Routes = [
  {path: 'Inicio', component: InicioComponent, }, 
  {path: '', component: Contenedor1Component, },
  {path: 'card', component: CardComponent, },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
