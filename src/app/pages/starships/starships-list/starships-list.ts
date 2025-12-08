import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsService } from '../../../core/services/starships';

@Component({
  selector: 'app-starships-list',
  standalone: true,
  imports: [],
  templateUrl: './starships-list.html',
  styleUrls: ['./starships-list.css'],
})
export class StarshipsListComponent implements OnInit {

  starshipList = signal<any[]>([]);

  constructor(public starships: StarshipsService){}

  ngOnInit(): void {
    this.getStarShips();
  }

  getStarShips(){
    this.starships.getStarShips().subscribe({
      next: (data) => {
        this.starshipList.set(data.results);

        console.log(data)
        console.log(this.starshipList())
      }, 
      error: (e) => {
        console.error(e);
      }
    })
  }
}
