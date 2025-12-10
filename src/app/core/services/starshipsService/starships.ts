import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { StarshipModel } from '../../../models/starship';
import { StarshipApiResponse } from '../../../models/starship-api-response';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private readonly STARSHIPS_URL: string = 'https://swapi.dev/api/starships/';

  starshipList = signal<StarshipModel[]>([]);
  nextPage = signal<string | null>(this.STARSHIPS_URL);

  constructor(private http: HttpClient) {}

  getAllPages() : void {
    const url = this.nextPage();
    if (!url) return;

    this.http
      .get<StarshipApiResponse>(url)
      .pipe(
        map((res) => {
          res.results = res.results.map((starshipInfo) => ({
            ...starshipInfo,
            id: this.getIdfromUrl(starshipInfo.url),
          }));
          return res;
        })
      )
      .subscribe({
        next: (data) => {
          this.starshipList.update((prev) => [...prev, ...data.results]);
          this.nextPage.set(data.next);
        },
        error: (error) => console.error(error),
      });
  }

  getStarShip(id: string) : Observable<StarshipModel> {
    const url = `${this.STARSHIPS_URL}${id}`;
    return this.http.get<StarshipModel>(url);
  }

  getIdfromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }
}
