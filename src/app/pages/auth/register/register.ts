import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/userService/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'main[register]',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  public message = this.userService.errorMessages;
  public errorInfo : string = '';

  formRegister: FormGroup;

  constructor(){
    this.formRegister = new FormGroup({
      email: new FormControl('',[ 
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._-]+([a-zA-Z0-9_-]+)*@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit() {
    this.userService.register(this.formRegister.value)
      .then(res => {
        this.router.navigate(['/starships']); 
      })
      .catch(error => {
        this.errorInfo = this.message.emailAlreadyExists;
         console.error('Error:',error)
      })
  }
}
