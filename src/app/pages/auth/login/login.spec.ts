
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/userService/user-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockUserService = {
      login: jasmine.createSpy('login'),
      errorMessages: {
        invalidEmail: 'Please enter a valid email',
        invalidPassword: 'Please enter a password that contains at least 6 characters',
        invalidCredentials: 'This email or password is invalid',
        emailAlreadyExists: 'This email already exists'
      }
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, LoginComponent ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email and password controls', () => {
    expect(component.formLogin.contains('email')).toBeTrue();
    expect(component.formLogin.contains('password')).toBeTrue();
  });

  it('should mark form invalid if fields are empty', () => {
    component.formLogin.controls['email'].setValue('');
    component.formLogin.controls['password'].setValue('')

    expect(component.formLogin.invalid).toBeTrue();
  });

  it('should display error messages for invalid email and password', () => {
    const emailControl = component.formLogin.controls['email'];
    const passwordControl = component.formLogin.controls['password'];

    emailControl.setValue(''); 
    emailControl.markAsTouched();
    passwordControl.setValue('');
    passwordControl.markAsTouched();

    expect(emailControl.invalid).toBeTrue();
    expect(passwordControl.invalid).toBeTrue();

    expect(component.message.invalidEmail).toBe('Please enter a valid email');
    expect(component.message.invalidPassword).toBe('Please enter a password that contains at least 6 characters');
  });

  it('should call onSubmit and attempt login when form is valid', () => {
    component.formLogin.setValue({
      email: 'pleaseStopTesting@gmail.com',
      password: '123456'
    })
    
    let called = false;
    (component as any).userService.login = () => {
      called = true;
      return Promise.resolve();
    };
    component.onSubmit();

    expect(called).toBe(true);
  });

});

