import { Component, ElementRef, OnInit, AfterViewInit ,ViewChild, inject } from '@angular/core';
import { StarshipsService } from '../../../core/services/starshipsService/starships';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'main[starships-list]',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './starships-list.html',
  styleUrls: ['./starships-list.css'],
})

export class StarshipsListComponent implements OnInit, AfterViewInit {

  @ViewChild('endPoint') endPoint!: ElementRef;
  
  private observer!: IntersectionObserver;
  public starships = inject(StarshipsService)

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
