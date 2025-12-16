
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipsListComponent } from './starships-list';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StarshipsListComponent', () => {
  let component: StarshipsListComponent;
  let fixture: ComponentFixture<StarshipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipsListComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

