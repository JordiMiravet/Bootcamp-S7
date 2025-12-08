import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarshipsService } from '../../../core/services/starships';

@Component({
  selector: 'app-starship-detail',
  standalone: true,
  imports: [],
  templateUrl: './starship-detail.html',
  styleUrl: './starship-detail.css',
})
export class StarshipDetailComponent {

  starship?: any;
  
  constructor(
    private route: ActivatedRoute, 
    private starships: StarshipsService
  ) {
    const name = route.snapshot.params['starshipName'];
    this.starship = this.starships.getStarShip(name);
    console.log(this.starship)
  }
  
}
