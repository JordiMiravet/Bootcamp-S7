import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { UserService } from '../services/userService/user-service';


@Component({
  selector: 'header[header]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  logOut():void {
    this.userService.logout()
      .then( () => {
        this.router.navigate([''])
      })
      .catch( error => console.log(error));
  }
}
