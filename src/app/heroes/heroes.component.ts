/**
 * Always import the Component Symbol  
 **/
import { Component, OnInit } from '@angular/core';

// Importar la interfaz
import { Hero } from '../hero';

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
  // Location of the component's private CSS style.
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  /**
   * +---------------+
   * | HERO PROPERTY |
   * +---------------+
   * 
   * Se refactorizará para usar la interfaz 
   * y así definir la forma del heroe: 
   * -- hero = "Windstorm"; --
   * 
   * Property -> hero
   * Type -> Object Hero
   */
  hero: Hero = {
    id: 1,
    name: "Windstorm"
  };

  constructor() { }

  /**
   * Este método permite inicializar y traer datos
   * al componente apenas sea renderizado por 
   * primera vez.
   */
  ngOnInit(): void {
  }
}
