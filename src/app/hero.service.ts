import { Injectable } from '@angular/core';

/**
 * Importando una clase para poder obtener
 * datos de forma asincrona.
 */
import { Observable, of } from 'rxjs';

// Importando dependencias al servicio
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// Importar servicios
import { MessageService } from './message.service';

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

  // Usar el servicio importado
  // Escenario conocido como: Service-in-Service
  constructor(private messageService: MessageService) { }

  /**
   * Función que retorna los héroes ->
   * su tipo de retorno es un array de 
   * Hero debido a que HEROES es un 
   * array de Hero. 
   */  
  // getHeroes(): Hero[] 
  // {
  //   return HEROES;
  // }

  getHeroes(): Observable<Hero[]>
  {
    /**
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
