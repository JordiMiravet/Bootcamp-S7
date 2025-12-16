import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './core/services/userService/user-service';

const authState: any = {
  uid: 'fakeName',
  email: 'test@test.com',
  emailVerified: true
};

const AngularFireAuthMock = {
  authState: of(authState)
};

describe('App', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        App, 
        RouterTestingModule 
      ],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthMock },
        { provide: UserService, useValue: {} }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
