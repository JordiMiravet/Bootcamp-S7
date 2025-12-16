import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { UserService } from '../services/userService/user-service';

@Component({
  selector: 'header[header]',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})

export class HeaderComponent {
  private userService = inject(UserService);
  private router =  inject(Router);

  public isLogged : WritableSignal<boolean> = this.userService.isLogged;

  logOut(): void {
    this.userService.logout()
      .then( () => {
        this.router.navigate([''])
      })
      .catch( error => {
        console.error('Error:', error);
      });
  }
}
