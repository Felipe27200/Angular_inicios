// Se debe importar el Input Symbol para poder usarlo.
import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


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
  hero: Hero | undefined;

  /**
   * Se debe inyectar los servicios en campos privados en el
   * constructor
   */
  constructor(
    /** 
     * - ActivatedRoute -> Contiene la información de la 
     * ruta para esta intancia de HeroDetailComponent.
     */ 
    private route: ActivatedRoute,
    /**
     * - Location -> es un servicio de Angular que permite 
     * interectuar con el navegador y regresar a la vista anterior.
     */
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void 
  {
    this.getHero();
  }

  getHero(): void
  {
    /**
     * The route.snapshot is a static image of the route information
     * shortly after (poco después) the component was created.
     * 
     * The paramMap is a dictionary of route parameter values extracted 
     * from the URL. La llave "id" retorna el id del hero a buscar.
     * 
     * Los parámetros de las rutas siempre son String.
     */

    // Se obtiene el valor de los parámetros de la ruta, extraídos de la URL.
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id).
      subscribe(hero => this.hero = hero);
  }

  goBack(): void  
  {
    this.location.back();
  }
}
