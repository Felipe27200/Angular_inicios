/**
 * El comando ng create crea este archivo en donde se pueden 
 * indicar las librerías, módulos y/u otros archivos necesarios.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importar HttpClient para realizar peticiones de esta naturaleza
import { HttpClientModule } from '@angular/common/http';

// Dependencias de la API in-memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Se importa el módulo de formularios de angular.
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';


@NgModule({
  /**
   * Son los componentes que se usarán en la aplicación
   */
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
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
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    /**
     * • HttpClientInMemoryWebApiModule -> interceptara las peticiones 
     * http y simulara las respuestas del servidor.
     * 
     * • Se removera cuando un servidor real este listo para recibir peticiones.
     */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
