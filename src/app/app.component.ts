import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Clase del componente
export class AppComponent {
  /**
   * VI del componentente, son accesibles mediante
   *  {{  }}
   */
  title = 'Tour of Heroes';
}
