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

// Importar dependencias HTTP
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from "rxjs/operators";

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
  /**
   * Definir un encabezado para la petición Update
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Tiene una sintaxis de :base/:collectionName
   * 
   * La base es el recurso al que se realizan las peticiones HTTP.
   * :collectionName son los datos del objeto heroes, proveniente
   * de in-memory-data-service.ts
   */
  private heroesUrl = 'api/heroes';

  // Usar el servicio importado
  // Escenario conocido como: Service-in-Service
  constructor(private messageService: MessageService,
      private http: HttpClient) { }

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
     * of() Retorna un Observable<Hero[]>, que emite un
     * único valor, el array del mock heroes.
     */
    // const heroes = of(HEROES);
    // return heroes;

    /**
     * Se envía un mensaje cuando los heroes son buscados/recuperados.
       this.messageService.add("Hero Service: fetched heroes");
     */

    // Se intercambia el método of(), pero ambos retornan un Observable
    // return this.http.get<Hero[]>(this.heroesUrl);

    // <<< MANEJAR LOS ERRORES >>>
    return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          /**
           * tap() no accede a los datos como tal, pero permite llamar
           * al método log() para enviar mesajes, ya que mira 
           * los Observables y sus valores, haciendo algo 
           * con ellos y pasándolos.
           */
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
  }

  getHero(id: number): Observable<Hero>
  {
    // const hero = HEROES.find(h => h.id === id)!;

    // this.messageService.add(`HeroService: fetched hero id = ${id}`);

    // return of(hero);

    /**
     * La :base es la url almacenada en heroesUrl, la cual
     * será el recurso al que se le harán las peticiones.
     * Después de / va el id a enviar.
     */
    const url = `${this.heroesUrl}/${id}`

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // Como la funcionalidad de mensajes se usa frecuentemente se 
  // usa un método log()
  private log(message: string)
  {
    this.messageService.add(`Hero Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Permite a la app continuar, enviando un resultado vacío.
      return of(result as T);
    }
  }

  updateHero(hero: Hero): Observable<any>
  {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        );
  }

  addHero(hero: Hero): Observable<Hero>
  {
    /**
     * Espera que el servidor cree un id para para el nuevo, que retorna
     * en el Observable<Hero> para quién realizo la llamada.
     */
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero>
  {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]>
  {
    if (!term.trim())
    {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
