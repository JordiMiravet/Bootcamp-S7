import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private readonly STARSHIPS_URL : string = 'https://swapi.dev/api/starships'

  constructor(private http: HttpClient){}

  getStarShips() {
    return this.http.get<any>(this.STARSHIPS_URL);
  }

}
