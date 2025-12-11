import { Component } from '@angular/core';
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

 formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ){
    this.formLogin = new FormGroup({
      email: new FormControl('',[ 
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(res => {
        console.log('Vale esto funciona por fin xD',res),
        this.router.navigate(['/login']); 
      })
      .catch(error => {
         console.log('Majo sigue intentandolo xD',error)
      })
  }
}
