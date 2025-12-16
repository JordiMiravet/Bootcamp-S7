
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipPilotsComponent } from './starship-pilots';
import { InputSignal, signal } from '@angular/core';
import { Pilot } from '../../../models/starship-pilot.model';

describe('StarshipPilotsComponent', () => {
  let component: StarshipPilotsComponent;
  let fixture: ComponentFixture<StarshipPilotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipPilotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipPilotsComponent);
    component = fixture.componentInstance;
    component.pilots = signal<Pilot[]>([]) as unknown as InputSignal<Pilot[]>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

