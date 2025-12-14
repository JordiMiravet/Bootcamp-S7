import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipFilms } from './starship-films';

describe('StarshipFilms', () => {
  let component: StarshipFilms;
  let fixture: ComponentFixture<StarshipFilms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipFilms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipFilms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
