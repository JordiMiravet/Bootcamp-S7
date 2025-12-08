import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: '[header]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {

}
