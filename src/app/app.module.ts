/**
 * El comando ng create crea este archivo en donde se pueden 
 * indicar las librerías, módulos y/u otros archivos necesarios.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
// Se importa el módulo de formularios de angular.
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  /**
   * Este array contiene los módulos externos
   * que la aplicación necesita.
   * 
   * Con esto los módulos importados ya podrán ser
   * usados.
   */
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
