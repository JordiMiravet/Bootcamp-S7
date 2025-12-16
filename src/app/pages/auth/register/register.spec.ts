
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register';
import { Auth } from '@angular/fire/auth';

const mockAuth = {
  onAuthStateChanged: () => {},
};

const mockRegister = jasmine.createSpy('register').and.returnValue(Promise.resolve());

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: Auth, useValue: mockAuth },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email and password controls', () => {
    expect(component.formRegister.contains('email')).toBe(true);
    expect(component.formRegister.contains('password')).toBe(true);
  });

  it('should mark form invalid if fields are empty', () => {
    component.formRegister.controls['email'].setValue('');
    component.formRegister.controls['password'].setValue('')

    expect(component.formRegister.invalid).toBeTrue();
  });

  it('should display error messages for invalid email and password', () => {
    const emailControl = component.formRegister.controls['email'];
    const passwordControl = component.formRegister.controls['password'];

    emailControl.setValue(''); 
    emailControl.markAsTouched();
    passwordControl.setValue('');
    passwordControl.markAsTouched();

    expect(emailControl.invalid).toBeTrue();
    expect(passwordControl.invalid).toBeTrue();

    expect(component.message.invalidEmail).toBe('Please enter a valid email');
    expect(component.message.invalidPassword).toBe('Please enter a password that contains at least 6 characters');
  });

  it('should call onSubmit and attempt register when form is valid', () => {
    component.formRegister.setValue({
      email: 'pleaseStopTestingVol2@gmail.com',
      password: '123456'
    })
    
    let called = false;
    (component as any).userService.register = () => {
      called = true;
      return Promise.resolve();
    };
    component.onSubmit();

    expect(called).toBe(true);
  });

});
