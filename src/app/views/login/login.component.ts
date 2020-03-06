import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = null;

  constructor( private auth: AuthService) { 
    auth.getCurrentLoggedIn();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.pattern('^(?=.*[0–9])(?=.*[a-zA-Z])([a-zA-Z0–9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ])
    });
  }

  login(): void{
    const inputValue = this.loginForm.value;
    console.log(inputValue.email, inputValue.password);
    this.auth.emailLogin(inputValue.email, inputValue.password)
  }

}
