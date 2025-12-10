import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/userService/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'section[register]',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {

  formRegister: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ){
    this.formRegister = new FormGroup({
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
    this.userService.register(this.formRegister.value)
      .then(res => {
        console.log('Vale esto funciona por fin xD',res),
        this.router.navigate(['/starships']); 
        // aqui luego pondré el loggin que no me da la vida si no xD
      })
      .catch(error => {
         console.log('Majo sigue intentandolo xD',error)
      })
  }
}
