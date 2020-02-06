import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrimerComponent} from './componentes/primer/primer.component'
import {InicioComponent} from './componentes/componentes/inicio/inicio.component'



const routes: Routes = [
  {path: '', component: InicioComponent, }, 
    {path: 'primer', component: PrimerComponent, },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
