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

// Importar dependencias HTTP
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Permite manejar las excepciones ocurridas en las peticiones
import { catchError, map, tap } from "rxjs/operators";

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
  private heroesUrl = 'api/heroes'; // URL to web api

  /**
   * Inyecta MessageService (Singleton) cuando se crea HeroService.
   * 
   * Escenario conocido como: Service-in-Service
   */ 
  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>
  {
    /** 
     * Se intercambia el método of() por
     * http.get(), la app funciona bien,
     * porque ambos retornan un Observable<Hero[]>. 
     * 
     * +------------------------------+
     * | RESPONSE OF HttpClient.get() |
     * +------------------------------+
     *
     * HttpClient.get() -> retorna el cuerpo de la 
     * respuesta como objeto JSON no tipado por defecto.
     * 
     * Aplicando el especificador de tipo (opcional) <Hero[]>
     * se añaden las capacidades de TypeScript, reduciendo los
     * errores durante el tiempo de compilación.
     */

    /** 
     * +---------------------------+
     * | HANDLE ERRORS -EXCEPTIONS | 
     * +---------------------------+
     */
    return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          /**
           * The RxJS tap() enable the ability of look at the observable
           * values, doing something with those values and passing them 
           * along.
           * 
           * The tap() call back doesn't access the values themselves.
           */
          tap(_ => this.log('fetched heroes')),
          /**
           * El operador catchError intercepta el error, luego
           * pasa el error para la función que lo manejará.
           * 
           * handleError() reporta el error y luego retorna un
           * resultado inocuo para que la app pueda continuar.
           */
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
  }

  getHero(id: number): Observable<Hero>
  {
    /**
     * La :baseURL es la URL almacenada en heroesUrl, la 
     * cual será el recurso al que se le harán las peticiones.
     * 
     * Después del slash (/) va el id a enviar.
     */
    const url = `${this.heroesUrl}/${id}`

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * Como la funcionalidad de mensajes se usa 
   * frecuentemente se usa un método log().
   */
  private log(message: string)
  {
    this.messageService.add(`Hero Service: ${message}`);
  }

  updateHero(hero: Hero): Observable<any>
  {
    /** PUT: update the hero on the server */
    /** Este método espera en el tercer parámetro el encabezado HTTP */
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        );
  }

  addHero(hero: Hero): Observable<Hero>
  {
    /**
     * Espera que el servidor cree un id para para el nuevo heroe, 
     * que retorna en el Observable<Hero> a quién realizo la llamada.
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

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * 
   * Como este método es usado por varias funciones, este define
   * un parámetro opcional, para indicar el valor de retorno que espera
   * la función que lo invoca.
   */
  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Permite a la app continuar, enviando un resultado vacío.
      return of(result as T);
    }
  }
}
