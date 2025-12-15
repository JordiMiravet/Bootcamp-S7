import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { onAuthStateChanged, User } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private auth = inject(Auth);

  public isLogged = signal(false);

  public errorMessages = {
    invalidEmail : 'Please enter a valid email',
    invalidPassword : 'Please enter a password that contains at least 6 characters',
    invalidCredentials : 'This email or password is invalid',
    emailAlreadyExists: 'This email already exists'
  }

  constructor() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.isLogged.set(!!user)
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password); 
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

}
