import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipInfo } from './starship-info';

describe('StarshipInfo', () => {
  let component: StarshipInfo;
  let fixture: ComponentFixture<StarshipInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
