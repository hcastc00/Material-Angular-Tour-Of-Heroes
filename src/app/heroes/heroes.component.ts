import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
    'table.mat-table {width: 100%}',
    '.mat-flat-button {margin: 1em}'
]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  dataSource = new MatTableDataSource<Hero>();
  displayedColumns: string[] = ['id', 'name', 'delete', 'details']

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes: Hero[]) => {
        this.heroes = heroes;
        this.dataSource.data = this.heroes;
      });


  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.dataSource.data = this.heroes;
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}