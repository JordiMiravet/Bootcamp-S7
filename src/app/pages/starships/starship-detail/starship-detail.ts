import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarshipsService } from '../../../core/services/starshipsService/starships';
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
    const id = this.route.snapshot.params['starshipName'];
    
    this.starships.getStarShip(id).subscribe({
      next: (res) => {
        this.starship = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
