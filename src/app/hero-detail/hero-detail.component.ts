// Se debe importar el Input para poder ser usada y recibir valores
// de campos input del template o componente que lo instancie
import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  // Se debe declarar la propiedad hero precedido por
  // el decorador @Input()
  @Input() hero?: Hero;

  /**
   * Se debe inyectar los servicios en campos privados en el
   * constructor
   * 
   * - ActivatedRoute -> Contiene la información de la ruta para
   * esta intancia de HeroDetailComponent.
   * 
   * - Location -> es un servicio de Angular que permite interectuar con 
   * el navegador y regresar a la vista anterior.
   */
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {

  }

  ngOnInit(): void 
  {
    this.getHero();
  }

  getHero(): void
  {
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
