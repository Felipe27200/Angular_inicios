// Import the Angular Injectable Symbol
import { Injectable } from '@angular/core';

/**
 * IMPORT DEPENDENCIES INSIDE THE SERVICE
 */
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

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

  constructor() { }

  /**
   * Función que retorna los héroes:
   * 
   * Su tipo de retorno es un array de 
   * Hero debido a que HEROES es un 
   * array de Hero. 
   */  
  getHeroes(): Hero[] 
  {
    return HEROES;
  }
}
