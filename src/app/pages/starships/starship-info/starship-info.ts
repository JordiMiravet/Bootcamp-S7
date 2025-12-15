import { Component, input } from '@angular/core';
import { StarshipModel } from '../../../models/starship.model';

@Component({
  selector: 'article[starship-info]',
  standalone: true,
  imports: [],
  templateUrl: './starship-info.html',
  styleUrl: './starship-info.css',
})
export class StarshipInfoComponent {

  public starship = input.required<StarshipModel>();

}
