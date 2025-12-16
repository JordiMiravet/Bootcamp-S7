
import { TestBed } from '@angular/core/testing';
import { StarshipsService } from './starships';
import { RouterTestingModule } from '@angular/router/testing';
import { signal, WritableSignal } from '@angular/core';
import { UserService } from '../userService/user-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

class MockUserService {
  isLogged: WritableSignal<boolean> = signal(false);
  logout() { return Promise.resolve(); }
} 

describe('StarshipsService', () => {
  let service: StarshipsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [{ provide: UserService, useClass: MockUserService }]
    });
    service = TestBed.inject(StarshipsService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize starshipList and nextPage correctly', () => {
    expect(service.starshipList.length).toBe(0)
  });

  it('getAllPages should update starshipList and nextPage', () => {
    service.getAllPages();

    const call = httpMock.expectOne('https://swapi.dev/api/starships/');
    expect(call.request.method).toBe('GET');

    call.flush({
      next: null,
      results: [
        {
          name: 'X-wing',
          url: 'https://swapi.dev/api/starships/12/'
        }
      ]
    });

    expect(service.starshipList().length).toBe(1);
    expect(service.nextPage()).toBeNull();
  });

  it('should extract id from URL correctly', () => {
    const id = service.getIdfromUrl('https://swapi.py4e.com/api/starships/10/');
    expect(id).toBe('10');
  });

  it('getStarShip should return starship with pilots and films', () => {
    let result: any;

    service.getStarShip('10').subscribe(data => {
      result = data;
    });

    httpMock.expectOne('https://swapi.dev/api/starships/10/').flush({
      name: 'Millennium Falcon',
      pilots: ['https://swapi.dev/api/people/1/'],
      films: ['https://swapi.dev/api/films/1/']
    });

    httpMock.expectOne('https://swapi.dev/api/people/1/').flush({
      name: 'Luke Skywalker'
    });

    httpMock.expectOne('https://swapi.dev/api/films/1/').flush({
      title: 'A New Hope'
    });

    expect(result.name).toBe('Millennium Falcon');
    expect(result.pilots.length).toBe(1);
    expect(result.films.length).toBe(1);
  });
});

