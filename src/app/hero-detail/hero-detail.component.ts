// Se debe importar el Input para poder ser usada
import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  // Se debe declarar la propiedad hero precedido por
  // el decorador @Input()
  @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }
}
