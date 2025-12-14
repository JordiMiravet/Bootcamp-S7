import { Component, input } from '@angular/core';
import { StarshipsService } from '../../../core/services/starshipsService/starships';
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
