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

/**
 * This have a critical metadata for all project.
 */
@NgModule({
  /**
   * Aquí se deben declarar los componentes, directive y pipes
   * que pertenecen a toda la aplicación y que estarán disponibles
   * para la misma.
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
