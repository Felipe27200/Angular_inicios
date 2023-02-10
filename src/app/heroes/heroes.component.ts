/**
 * Always import the Component Symbol  
 **/
import { Component, OnInit } from '@angular/core';

// Importar la interfaz
import { Hero } from '../hero';
// Importar the Service
import { HeroService } from '../hero.service';

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
   * Se le asigna la variable correspondiente,
   * que almacena los datos del módulo importado.
   */
  heroes: Hero[] = [];

  /**
   * Aquí se crea la VI indicando que 
   * puede ser undefined, gracias al "?"
   */  
  selectedHero?: Hero;

  /**
   * Este párametro simultaneamente define la VI
   * private heroService y la identifica como el
   * sitio donde se hará la inyección de HeroService.
   * 
   * Cuando se crea HeroesComponent la Dependency
   * Injection System determina el párametro 
   * heroService con la intancia Singleton de HeroService.
   */
  constructor(private heroService: HeroService) { }

  // Método de la clase -> parámetro Hero y retorno void
  onSelect(hero: Hero): void
  {
    this.selectedHero = hero;
  }

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

  getHeroes(): void 
  {
    /**
     * Aquí se asigna a la propiedad heroes un array 
     * con heroes predefinidos, los cuales son traidos
     * mediante la variable de instancia heroService,
     * que almacena una instancia del servicio y permite
     * acceder a sus atributos y propiedades.
     */
    this.heroes = this.heroService.getHeroes();
  }
}
