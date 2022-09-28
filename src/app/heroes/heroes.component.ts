import { Component, OnInit } from '@angular/core';

// Importar la interfaz
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  /**
   * Se refactorizará para usar la interfaz y así
   * definir la forma del heroe
   * hero = "Windstorm";
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
