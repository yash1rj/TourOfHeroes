import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './Hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: Started fetching heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: Started fetching hero with id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  updateHero(id: number): void {
    this.messageService.add(`HeroService: Started updating hero with id=${id}`);
    HEROES.map((hero, i) => {
      if(hero.id === id) {
        // console.log(hero, HEROES);
        HEROES[i] = hero;
      }
    });
  }
}
