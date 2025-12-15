import { Component, input } from '@angular/core';
import { Film } from '../../../models/starship-film.model';

@Component({
  selector: 'article[starship-films]',
  standalone: true,
  imports: [],
  templateUrl: './starship-films.html',
  styleUrls: ['./starship-films.css'],
})
export class StarshipFilmsComponent {

  public films = input.required<Film[]>();

}
