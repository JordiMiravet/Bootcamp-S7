import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipDetailComponent } from './starship-detail';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StarshipsService } from '../../../core/services/starshipsService/starships';
import { StarshipModel } from '../../../models/starship.model';
import { Pilot } from '../../../models/starship-pilot.model';
import { Film } from '../../../models/starship-film.model';

describe('StarshipDetailComponent', () => {
  let component: StarshipDetailComponent;
  let fixture: ComponentFixture<StarshipDetailComponent>;

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

  const mockRoute = {
    snapshot: {
      params: {
        starshipName: 'X-Wing',
      },
    },
  };

  const mockStarshipsService = {
    getStarShip: jasmine.createSpy('getStarShip').and.returnValue(of(mockStarship)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: StarshipsService, useValue: mockStarshipsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StarshipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load starship and set loading to false', () => {
    expect(component.starship).toEqual(mockStarship);
    expect(component.loading).toBeFalse();
    expect(mockStarshipsService.getStarShip).toHaveBeenCalledWith('X-Wing');
  });
});
