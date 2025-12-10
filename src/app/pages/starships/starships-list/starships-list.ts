import { Component, ElementRef, OnInit, AfterViewInit ,ViewChild, viewChild } from '@angular/core';
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

  @ViewChild('endPoint') endPoint!: ElementRef;
  private observer!: IntersectionObserver;
  
  constructor(public starships: StarshipsService){}

  ngOnInit(): void {
    this.starships.getAllPages();
  }
  
  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver( entries => {
      if (entries[0].isIntersecting) {
        this.starships.getAllPages();
        if(!this.starships.nextPage()){
          this.observer.disconnect();
        }
      }
    });

    this.observer.observe(this.endPoint.nativeElement);
  }
}
