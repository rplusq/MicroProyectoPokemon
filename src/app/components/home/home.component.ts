import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { FetchService } from 'src/app/services/fetch.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokedex: Pokemon[];
  jsonPath = 'assets/json/pokemons.json';
  

  constructor(private fs: FetchService) { }

  ngOnInit() {
    this.fs.getJSON(this.jsonPath).subscribe(data => {
      this.pokedex = data;
      console.log(this.pokedex);
    });
  }

}
