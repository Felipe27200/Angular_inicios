/**
 * Always import the Component Symbol  
 **/
import { Component, OnInit } from '@angular/core';

// Importar la interfaz
import { Hero } from '../hero';
// Importar mock HEROES
import { HEROES } from '../mock-heroes';

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
  heroes = HEROES;

  /**
   * Aquí se crea la VI indicando que 
   * puede ser undefined, gracias al "?"
   */
  selectedHero?: Hero;

  constructor() { 

  }

  // Método de la clase -> parámetro Hero y retorno void
  onSelect(hero: Hero): void
  {
    this.selectedHero = hero;
  }

  /**
   * Este método permite inicializar y traer datos
   * al componente apenas sea renderizado por 
   * primera vez.
   */
  ngOnInit(): void {
  }
}
