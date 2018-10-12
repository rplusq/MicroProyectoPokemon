import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  checkPokemonDetails(pokeName: string){
    this.router.navigate(['/details'], { queryParams: { name : pokeName } });
  }

}
