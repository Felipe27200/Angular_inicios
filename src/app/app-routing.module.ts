import { NgModule } from '@angular/core';

/**
 * Importar las dependencias del enrutamiento,
 * brindan la capacidad del enrutamiento.
 */
import { RouterModule, Routes } from "@angular/router";

/**
 * Se importa el componente principal de heroes.
 * 
 * Así el enrutador tiene a dónde ir una vez las 
 * rutas han sido definidas.
 */
import { HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

/**
 * - path -> es un string que corresponde a la ruta.
 * 
 * - component -> corresponde al componente que el router 
 *   debería crear cuando se navega hacia esa rutas.
 */
const routes: Routes = [
  /*
    Así se logra crear una ruta predefinida que permite
    redireccionar y mostrar el dashboard siempre que la ruta
    en el navegado esté vacía.
  */
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},

  /**
   * Con esta ruta se le podrá enviar datos al componente.
   * Los dos puntos indican que id almacena un valor.
   */
  {path: 'detail/:id', component: HeroDetailComponent},
];

/**
 * Los @Ngmodule metadatos inicializan el router
 * y empiezan a eschuchar los cambios de locación
 * en el navegador.
 */
@NgModule({
  /**
   * Se añade el RouterModule con el método
   * forRoot(), el cual es configurado con la VI
   * routes, este método configura el enrutador
   * a nivel raíz de la aplicación.
   * 
   * Este método provee los service providers y 
   * las directivas necesarias para el enrutamiento.
   */
  imports: [
    RouterModule.forRoot(routes)
  ],

  /**
   * Se debe exportar RouterModule para que 
   * esté disponible a través de toda la app.
   */
  exports: [RouterModule]
})

export class AppRoutingModule { }
