import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { StarshipModel } from '../../models/starship';
import { StarshipApiResponse } from '../../models/starship-api-response';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private readonly STARSHIPS_URL : string = 'https://swapi.dev/api/starships/';

  starshipList = signal<StarshipModel[]>([]);
  nextPage = signal<string | null>(this.STARSHIPS_URL);
  
  constructor(private http: HttpClient){}

  loadNextPage() {
    const url = this.nextPage();
    if(!url) return;

    this.http.get<StarshipApiResponse>(url).subscribe({
      next: (data) => {
        this.starshipList.update( prev => [...prev, ...data.results]);
        this.nextPage.set(data.next);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  
  getStarShip(name: string) {
    const url = `${this.STARSHIPS_URL}?search=${name}`;
    return this.http.get<StarshipApiResponse>(url);
  }
  
}
