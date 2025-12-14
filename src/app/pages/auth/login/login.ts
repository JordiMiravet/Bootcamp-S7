import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/userService/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'section[login]',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {

  private userService = inject(UserService);
  private router = inject(Router)

  formLogin: FormGroup;

  constructor(){
    this.formLogin = new FormGroup({
      email: new FormControl('',[ 
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._-]+([a-zA-Z0-9_-]+)*@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  onSubmit() {
    if( this.formLogin.invalid) return;

    this.userService.login(this.formLogin.value)
      .then(res => {
        this.router.navigate(['/starships']); 
      })
      .catch(error => {
         console.error('Error:',error);
      })
  }
}
