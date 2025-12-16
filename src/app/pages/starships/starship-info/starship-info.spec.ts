
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipInfoComponent } from './starship-info';
import { StarshipModel } from '../../../models/starship.model';
import { Pilot } from '../../../models/starship-pilot.model';
import { Film } from '../../../models/starship-film.model';
import { InputSignal, signal } from '@angular/core';

describe('StarshipInfoComponent', () => {
  let component: StarshipInfoComponent;
  let fixture: ComponentFixture<StarshipInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipInfoComponent);
    component = fixture.componentInstance;

    const mockStarship: StarshipModel = {
      name: 'X-Wing',
      model: 'T-65',
      manufacturer: 'Incom Corporation',
      cost_in_credits: '149999',
      length: '12.5',
      max_atmosphering_speed: '1050',
      crew: '1',
      passengers: '0',
      starship_class: 'Starfighter',
      url: 'https://swapi.dev/api/starships/12/',
      id: '12',
      pilots: [] as Pilot[],
      films: [] as Film[],
    };

    component.starship = signal(mockStarship) as unknown as InputSignal<StarshipModel>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

