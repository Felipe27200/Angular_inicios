import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {
  /**
   * 
   * @param messageService al ser Singleton HeroService
   * y este componente hacen referencia al mismo objeto.
   * 
   * Debe ser público porque este será vinculado en el template.
   * 
   * Angular solo vincula las propiedas publicas del componente.
   */
  constructor(public messageService: MessageService) { }

  ngOnInit(): void 
  {

  }
}
