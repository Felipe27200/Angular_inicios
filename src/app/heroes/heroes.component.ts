/**
 * Always import the Component Symbol  
 **/
import { Component, OnInit } from '@angular/core';

// Importar la interfaz
import { Hero } from '../hero';
// Importar the Service
import { HeroService } from '../hero.service';

// Importa el servicio de mensajes
import { MessageService } from '../message.service';

/**
 * The annotation @Component is a decorator
 * function that specifies the Angular metadata
 * for the component.
 */
@Component({
  // The identifier for the component, based on CSS selectors.
  selector: 'app-heroes',
  // Location of the component's template file
  templateUrl: './heroes.component.html',
  /**
   * Por la nomenclatura, se indica que la hoja de 
   * estilos pertenece a este documento en específico,
   * por ende, no podrá ser aplicado en ningún otro.
   * 
   * Se sobrepone a los estilos del padre o globales.
   */  
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  /**
   * Se define la propiedad heroes en la clase
   * del componente para hacer accesibles los 
   * heroes del módulo importado mock-heroes.
   * 
   * Se le asigna a la variable correspondiente,
   * que almacena los datos del módulo importado.
   */
  heroes: Hero[] = [];

  /**
   * Este párametro simultaneamente define la VI
   * private heroService y la identifica como el
   * sitio donde se hará la inyección de HeroService.
   * 
   * Cuando se crea HeroesComponent la Dependency
   * Injection System determina el párametro 
   * heroService con la intancia Singleton de HeroService.
   * 
   * Se añade el servicio al constructor, para que 
   * este sea buscado e integrado, el parámetro es una 
   * instancia del servicio.
   */
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  /**
   * Este método permite inicializar y traer datos
   * al componente apenas sea renderizado por 
   * primera vez.
   * 
   * Realiza la invocación del método getHeroes()
   * apenas el componente haya sido contruido adecuadamente.
   */
  ngOnInit(): void 
  {
    this.getHeroes();
  }

  /**
   * Como el método getHeroes() en hero.service retorna ahora
   * un Observable<Hero[]> se necesita ajustar el método
   * getHeroes() de este componente para que pueda trabajar con
   * este cambio.
   * 
   */
  getHeroes(): void 
  {
    /**
     * Ahora el método espera que el Observable emita el array de heroes,
     * que puede ocurrir ahora o un tiempo después.
     * 
     * El método subscribe() pasa el array emitido al callback encargado
     * de asignarlo a la propiedad "heroes" de este componente.
     * 
     * Se accede a la propiedad de la clase que almacena la instancia
     * del servicio (heroService), así se accede a su método getHeroes(),
     * para luego invocar al método subscribe().
     */

    /**
     * +-------------------------------------------+
     * | subscribe() METHOD -> CRITICAL DIFFERENCE |
     * +-------------------------------------------+
     */
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add (name: string): void
  {
    name = name.trim();

    if (!name) { return; };

    /**
     * El handler crea un objeto basado en el nombre del heroe,
     * luego el handler envía el objeto al método del servicio
     * addHero().
     * 
     * Cuando este método crea un nuevo objeto, el callback subscribe() 
     * recibe el nuevo heroe y lo pone dentro de la lista heroes para mostrarlo.
     */
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero); 
      });
  }

  delete (hero: Hero): void
  {
    this.heroes = this.heroes.filter(h => h !== hero);

    /**
     * El componente no tiene nada que hacer con el 
     * Observable retornado, pero siempre es necesario
     * llamar al método subscribe().
     */
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
