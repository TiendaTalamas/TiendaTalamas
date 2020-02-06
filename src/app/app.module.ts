import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimerComponent } from './componentes/primer/primer.component';
import { InicioComponent } from './componentes/componentes/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    PrimerComponent,
    InicioComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
