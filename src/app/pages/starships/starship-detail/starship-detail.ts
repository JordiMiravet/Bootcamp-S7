import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarshipsService } from '../../../core/services/starships';
import { StarshipModel } from '../../../models/starship';

@Component({
  selector: 'app-starship-detail',
  standalone: true,
  imports: [],
  templateUrl: './starship-detail.html',
  styleUrl: './starship-detail.css',
})
export class StarshipDetailComponent {

  starship?: StarshipModel;
  
  constructor(
    private route: ActivatedRoute, 
    private starships: StarshipsService
  ) {
    console.log(starships)
    const name = route.snapshot.params['starshipName'];
    this.starship = this.starships.getStarShip(name);
  }
}
