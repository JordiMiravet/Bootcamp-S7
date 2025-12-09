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
  loading = true;
  
  constructor(
    private route: ActivatedRoute, 
    private starships: StarshipsService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.params['starshipName'];
    
    this.starships.getStarShip(name).subscribe({
      next: (res) => {
        this.starship = res.results[0];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
