
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipFilmsComponent } from './starship-films';
import { Film } from '../../../models/starship-film.model';
import { InputSignal, signal } from '@angular/core';

describe('StarshipFilmsComponent', () => {
  let component: StarshipFilmsComponent;
  let fixture: ComponentFixture<StarshipFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipFilmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipFilmsComponent);
    component = fixture.componentInstance;
    component.films = signal<Film[]>([]) as unknown as InputSignal<Film[]>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

