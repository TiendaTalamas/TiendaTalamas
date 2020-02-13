import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Contenedor1Component} from './componentes/contenedor1/contenedor1.component'
import {CardComponent} from './componentes/card/card.component'
import {RegistroComponent} from './componentes/registro/registro.component'




const routes: Routes = [
  {path: '', component: Contenedor1Component, },
  {path: 'card', component: CardComponent, },
  {path: 'registro', component: RegistroComponent, },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
