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



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Contenedor1Component,
    CardComponent,
    RegistroComponent,
    LibreriaComponent,
   
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
