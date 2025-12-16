import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';
import { UserService } from '../services/userService/user-service';
import { RouterTestingModule } from '@angular/router/testing';
import { signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';

class MockUserService {
  isLogged: WritableSignal<boolean> = signal(false);
  logout() { return Promise.resolve(); }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService: MockUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as unknown as MockUserService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navigation links correctly', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('.header__nav a');
    
    expect(navLinks.length).toBe(2);
    expect(navLinks[0].textContent).toContain('Home');
    expect(navLinks[1].textContent).toContain('StarShips');
  });

  it('should display login and register links when user is not logged in', () => {
    userService.isLogged.set(false);
    fixture.detectChanges();

    const logoutLink = fixture.nativeElement.querySelector('#logout');
    const loginLink = fixture.nativeElement.querySelector('#login');
    const registerLink = fixture.nativeElement.querySelector('#register');

    expect(logoutLink).toBeNull();
    expect(loginLink).toBeTruthy();
    expect(registerLink).toBeTruthy();
  });

  it('should display logout link when user is logged in', () => {
    userService.isLogged.set(true);
    fixture.detectChanges();

    const logoutLink = fixture.nativeElement.querySelector('#logout');
    const loginLink = fixture.nativeElement.querySelector('#login');
    const registerLink = fixture.nativeElement.querySelector('#register');

    expect(logoutLink).toBeTruthy();
    expect(loginLink).toBeNull();
    expect(registerLink).toBeNull();
  });

});
