import { Component, ElementRef, OnInit, AfterViewInit ,ViewChild } from '@angular/core';
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
export class StarshipsListComponent implements OnInit, AfterViewInit {

  private observer!: IntersectionObserver;
  
  constructor(public starships: StarshipsService){}

  ngOnInit(): void {
    this.starships.loadNextPage();
  }

  ngAfterViewInit(): void {
    const endPoint = document.getElementById('endPoint');
    if (!endPoint) return;

    this.observer = new IntersectionObserver( entries => {
      if (entries[0].isIntersecting) {
        this.starships.loadNextPage();
        if(!this.starships.nextPage()){
          this.observer.disconnect();
        }
      }
    });
    this.observer.observe(endPoint);
  }
}
