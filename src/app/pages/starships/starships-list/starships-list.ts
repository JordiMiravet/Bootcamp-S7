import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipsService } from '../../../core/services/starships';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'section[starships-list]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './starships-list.html',
  styleUrls: ['./starships-list.css'],
})
export class StarshipsListComponent implements OnInit {

  constructor(public starships: StarshipsService){}

  ngOnInit(): void {
    this.starships.getStarShips();
  }
}
