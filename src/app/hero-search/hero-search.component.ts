import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void 
  {
    this.heroes$ = this.searchTerms.pipe(
      // Espera 300 ms después de cada pulsación para considerar el término
      debounceTime(300),

      // Ignora el term si es el mismo que el anterior
      distinctUntilChanged(),

      /**
       * Cambia al nuevo obsevable buscado, cada vez que el term cambia.
       */
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  // Pone la busqueda del term dentro del flujo del observable.
  search (term: string): void
  {
    this.searchTerms.next(term);
  }
}
