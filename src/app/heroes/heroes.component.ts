import { Component, OnInit } from '@angular/core';

// Importar la interfaz
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes'; -> Ya no será necesaria gracias a los servicios
import { HeroService } from '../hero.service';

// Importa el servicio de mensajes
import { MessageService } from '../message.service';

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
  // heroes = HEROES;
  heroes: Hero[] = [];

  /**
   * Se refactorizará para usar la interfaz y así
   * definir la forma del heroe
   * hero = "Windstorm";
   */
  // hero: Hero = {
  //   id: 1,
  //   name: "Windstorm"
  // };

  // Aquí se crea la VI indicando que puede ser 
  // undefined, gracias al "?"
  // selectedHero?: Hero;

  // Se añade el servicio al constructor, para que 
  // este sea buscado e integrado, el parámetro es una 
  // instancia del servicio.
  constructor(private heroService: HeroService, private messageService: MessageService) 
  { 

  }

  // método de la clase: parámetro Hero y retorno void
  // onSelect(hero: Hero): void
  // {
  //   /**
  //    * Se muestra el id del heroe seleccionado en un mensaje.
  //    */
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);

  //   this.selectedHero = hero;
  // }

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

  // getHeroes(): void 
  // {
  //   /**
  //    * Aquí se asigna a la propiedad heroes un array 
  //    * con heroes predefinidos, los cuales son traidos
  //    * mediante la variable de instancia heroService,
  //    * que almacena una instancia del servicio y permite
  //    * acceder a sus atributos y propiedades.
  //    */
  //   this.heroes = this.heroService.getHeroes();
  // }

  /**
   * Como el método getHeroes() en hero.service retorna ahora
   * un Observable<Hero[]> se necesita ajustar el método
   * getHeroes() de este componente para que pueda trabajar con
   * este cambio.
   * 
   */
  getHeroes(): void 
  {
    /**
     * Ahora el método espera que el Observable emita el array de heroes.
     * 
     * Se accede a la propiedad de la clase que almacena la instancia
     * del servicio heroService, así se accede a su método getHeroes(),
     * para luego invocar al método subscribe.
     * 
     * subscribe() pasa el array emitido al callback, que lo establece
     * en la propiedad "heroes" de este componente.
     */
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

}
