import { Component, OnInit } from '@angular/core';

// Importar la interfaz
// import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',

  /**
   * Por la nomenclatura, se indica que la hoja 
   * de estilos pertenece a este documento en específico,
   * por ende, no podrá ser aplicado en ningún otro.
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
  heroes = HEROES;

  /**
   * Se refactorizará para usar la interfaz y así
   * definir la forma del heroe
   * hero = "Windstorm";
   */
  // hero: Hero = {
  //   id: 1,
  //   name: "Windstorm"
  // };

  constructor() { }

  /**
   * Este método permite inicializar y traer datos
   * al componente apenas sea renderizado por 
   * primera vez.
   */
  ngOnInit(): void {
  }
}
