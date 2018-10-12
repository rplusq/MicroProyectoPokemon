import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/Pokemon';
import { Evolution } from 'src/app/models/Evolution';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pokedex: Pokemon[];
  jsonPath = 'assets/json/pokemons.json';
  hasEvolutions: boolean;
  selected: any;
  evolutions: any[];
  isLoading: boolean;

  constructor(private fs: FetchService, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.evolutions = [];
    this.fs.getJSON(this.jsonPath).subscribe(data => {
      this.pokedex = data;
      this.selected = this.searchForPokemon(this.ar.snapshot.queryParams.name);
      console.log(this.selected);
      if (this.selected.evolutions[0]) {
        this.hasEvolutions = true;
        for (const evolution of this.selected.evolutions) {
          if(!evolution.to.includes('-mega')){
            if(evolution.level){
              if(this.searchForEvolution(evolution.to, evolution.method, evolution.level)){
                this.evolutions.push(this.searchForEvolution(evolution.to, evolution.method, evolution.level));
              }
            }else{
              if(this.searchForEvolution(evolution.to, evolution.method, 'null')){
                this.evolutions.push(this.searchForEvolution(evolution.to, evolution.method, 'null'));
              }
            }
          }
        }
        console.log(this.evolutions);
      }
      this.isLoading = false;
    });
  }

  searchForPokemon(name: string) {
    for (const pokemon of this.pokedex) {
      if (name === pokemon.name) {
        return pokemon;
      }
    }
  }

  searchForEvolution(name: string, evMeth: string, evLev: string){
    for (const pokemon of this.pokedex) {
      if(name === pokemon.name){
        let evolution: Evolution;
        if(evLev !== 'null'){
          evolution = {
            name : pokemon.name,
            art_url: pokemon.art_url,
            level: evLev,
            method: evMeth
          };
        }else{
          evolution = {
            name : pokemon.name,
            art_url: pokemon.art_url,
            method: evMeth
          };
        }
        return evolution;
      }
    }
    return null;
  }

}