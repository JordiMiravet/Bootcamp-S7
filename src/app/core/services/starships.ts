import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { StarshipModel } from '../../models/starship';
import { StarshipApiResponse } from '../../models/starship-api-response';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private readonly STARSHIPS_URL : string = 'https://swapi.dev/api/starships'

  starshipList = signal<StarshipModel[]>([]);
  
  constructor(private http: HttpClient){}

  getStarShips() {
    this.http.get<StarshipApiResponse>(this.STARSHIPS_URL).subscribe({
      next: (data) => this.starshipList.set(data.results),
      error: (e) => console.error(e),
    });
  }

  getStarShip(name: string) {
    return this.starshipList().find((starship) => starship.name === name)
  }

}
