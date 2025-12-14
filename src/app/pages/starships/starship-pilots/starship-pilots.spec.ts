import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipPilots } from './starship-pilots';

describe('StarshipPilots', () => {
  let component: StarshipPilots;
  let fixture: ComponentFixture<StarshipPilots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipPilots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipPilots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
