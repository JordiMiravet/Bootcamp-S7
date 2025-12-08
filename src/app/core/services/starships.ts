import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private readonly STARSHIPS_URL : string = 'https://swapi.dev/api/starships'

  starshipList = signal<any[]>([]);
  
  constructor(private http: HttpClient){}

  getStarShips() {
    this.http.get<any>(this.STARSHIPS_URL).subscribe({
      next: (data) => this.starshipList.set(data.results),
      error: (e) => console.error(e),
    });
  }

  getStarShip(name: string) {
    return this.starshipList().find((starship) => starship.name === name)
  }

}
