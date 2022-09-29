/**
 * El comando ng create crea este archivo en donde se pueden 
 * indicar las librerías, módulos y/u otros archivos necesarios.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Se importa el módulo de formularios de angular.
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


@NgModule({
  /**
   * Son los componentes que se usarán en la aplicación
   */
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent
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
