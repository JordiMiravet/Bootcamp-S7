import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { StarshipModel } from '../../../models/starship.model';
import { StarshipApiResponse } from '../../../models/starship-api-response.model';
import { forkJoin, map, mergeAll, Observable, of, switchMap } from 'rxjs';
import { Pilot } from '../../../models/starship-pilot.model';
import { Film } from '../../../models/starship-film.model';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private http = inject(HttpClient)

  private readonly STARSHIPS_URL: string = 'https://swapi.dev/api/starships/';

  starshipList = signal<StarshipModel[]>([]);
  nextPage = signal<string | null>(this.STARSHIPS_URL);

  getAllPages() : void {
    const url = this.nextPage();
    if (!url) return;

    this.http
      .get<StarshipApiResponse>(url).pipe(
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

  getIdfromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }

  getStarShip(id: string): Observable<StarshipModel> {
    const url = `${this.STARSHIPS_URL}${id}/`;

    return this.http.get<any>(url).pipe(

      switchMap(starship => {
        const pilotRequests = starship.pilots.map((pilotUrl: string) =>
          this.http.get<Pilot>(pilotUrl)
        );

        return pilotRequests.length
          ? forkJoin(pilotRequests).pipe(
              map(pilots => ({ ...starship, pilots }))
            )
          : of({ ...starship, pilots: [] });
      }),

      switchMap(starship => {
        const filmRequests = starship.films.map((filmUrl: string) =>
          this.http.get<Film>(filmUrl)
        );

        return filmRequests.length
          ? forkJoin(filmRequests).pipe(
              map(films => ({ ...starship, films }))
            )
          : of({ ...starship, films: [] });
      })
    );
  }

}
