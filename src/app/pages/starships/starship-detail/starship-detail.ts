import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarshipsService } from '../../../core/services/starshipsService/starships';
import { StarshipModel } from '../../../models/starship.model';
import { StarshipPilotsComponent } from '../starship-pilots/starship-pilots';
import { StarshipFilmsComponent } from '../starship-films/starship-films';
import { StarshipInfoComponent } from '../starship-info/starship-info';

@Component({
  selector: 'main[starship-detail]',
  standalone: true,
  imports: [StarshipPilotsComponent, StarshipFilmsComponent, StarshipInfoComponent],
  templateUrl: './starship-detail.html',
  styleUrl: './starship-detail.css',
})
export class StarshipDetailComponent {

  private route =  inject(ActivatedRoute); 
  private starships =  inject(StarshipsService);

  public starship?: StarshipModel;
  public loading = true;

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
