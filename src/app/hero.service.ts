import { Injectable } from '@angular/core';

// Importando dependencias al servicio
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// Le indica a Angular que puede usar esta
// clase en el DI system
@Injectable({
  /**
   * Este campo indica que el servicio
   * será inyecado a root level.
   */
  providedIn: 'root'
})

export class HeroService {

  constructor() { }

  /**
   * Función que retorna los héroes ->
   * su tipo de retorno es un array de 
   * Hero debido a que HEROES es un 
   * array de Hero. 
   */  
  getHeroes(): Hero[] 
  {
    return HEROES;
  }
}
