import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { StarshipModel } from '../../../models/starship.model';
import { StarshipApiResponse } from '../../../models/starship-api-response.model';
import { forkJoin, map, mergeAll, Observable, of, switchMap } from 'rxjs';

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

  getStarShip(id: string): Observable<StarshipModel> {
    const url = `${this.STARSHIPS_URL}${id}/`;

    return this.http.get<any>(url)
      .pipe(
        map(starship => {
          const pilotRequests = starship.pilots.map((pilotUrl: string) =>
            this.http.get<{ name: string }>(pilotUrl)
          );

          return {
            starship,
            pilotRequests
          };
        }),
        switchMap(({ starship, pilotRequests }) =>
          pilotRequests.length
            ? forkJoin(pilotRequests).pipe(
                map(pilots => ({
                  ...starship,
                  pilots
                }))
              )
            : of({ ...starship, pilots: [] })
        )
      );
  }

  getIdfromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }
}
