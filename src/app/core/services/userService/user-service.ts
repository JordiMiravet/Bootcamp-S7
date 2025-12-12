import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { onAuthStateChanged, User } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private auth = inject(Auth);

  isLogged = signal(false);

  constructor() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.isLogged.set(!!user)
    })
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
