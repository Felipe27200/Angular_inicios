// Se debe importar el Input Symbol para poder usarlo.
import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  /**
   * Binding data from the parent to child
   * 
   * @Input () -> le permite al componente padre 
   * modificar datos en el componente hijo. 
   */

  /**
   * Para esto, la propiedad debe ser Input property,
   * anotada con el @Input() decorator.
   */
  @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }
}
