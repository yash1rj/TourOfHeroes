import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    /* 
    The route.snapshot is a static image of the route information shortly 
    after the component was created.
    The paramMap is a dictionary of route parameter values extracted 
    from the URL. The "id" key returns the id of the hero to fetch.
    Route parameters are always strings. 
    The JavaScript (+) operator converts the string to a number, 
    which is what a hero id should be.
    */

    this.heroService.getHero(id)
      .subscribe((hero) => {
        // console.log(hero);
        if(hero !== undefined) {
          this.hero = hero;
          this.messageService.add(`HeroService: Fetching hero with id=${id}`);
        }
        else {
          this.messageService.add(`HeroService: No hero found with id=${id}`);
        }
      });
  }

  save() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.heroService.updateHero(id);
    this.messageService.add(`HeroService: Updated hero with id=${id}`);
  }

}
