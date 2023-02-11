// Import the Angular Injectable Symbol
import { Injectable } from '@angular/core';

/**
 * Importar dependencias para poder
 * obtener datos de forma asíncrona.
 */
import { Observable, of } from 'rxjs';

/**
 * IMPORT DEPENDENCIES INSIDE THE SERVICE
 */
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// Importar servicios
import { MessageService } from './message.service';

/**
 * Marca la clase como una que participa
 * en el Dependency Injection System.
 * 
 * Por ende, la clase HeroService va a 
 * proveer un servicio inyectable, también
 * podrá tener sus propias dependencias.
 * 
 * * También acepta metadatos entre sus
 * * paréntesis
 * 
 */
@Injectable({
  /**
   * Para poder hacer uso de un servicio y
   * hacerlo disponible para el Dependecy 
   * Injection, se debe registrar un provider.
   * 
   * Es algo que puede crear o repartir un servicio,
   * en este caso, instancia HeroService para poder
   * proveerlo.
   * 
   * Para estar seguro que HeroService puede proveer
   * el servicio, registrelo con el inyector, el cuál
   * es el objeto que elige e inyecta el provider
   * donde la aplicación lo requiere.
   * 
   * Esto indica que se inyecto a nivel raíz, por lo que
   * es accesible para todos.
   */
  providedIn: 'root'
})

export class HeroService {

  /**
   * Inyecta MessageService (Singleton) cuando se crea HeroService.
   * 
   * Escenario conocido como: Service-in-Service
   */
  constructor(private messageService: MessageService) { }

  /**
   * El método se ha adaptado para 
   * retornar el Observable Hero
   */
  getHeroes(): Observable<Hero[]>
  {
    /**
     * of(HEROES):
     * 
     * Retorna un Observable<Hero[]>, que emite un
     * único valor, el array del mock heroes.
     */
    const heroes = of(HEROES);

    /**
     * Se envía un mensaje cuando los heroes son buscados/recuperados.
     */
    this.messageService.add("Hero Service: fetched heroes");

    return heroes;
  }
}
