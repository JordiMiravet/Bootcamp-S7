import { Component, input } from '@angular/core';
import { Pilot } from '../../../models/starship-pilot.model';

@Component({
  selector: 'section[starship-pilots]',
  standalone: true,
  imports: [],
  templateUrl: './starship-pilots.html',
  styleUrls: ['./starship-pilots.css'],
})
export class StarshipPilotsComponent {

  pilots = input.required<Pilot[]>();

}
