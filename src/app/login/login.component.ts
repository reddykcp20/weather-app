import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  hide: boolean = true
  email = 'user@example.com'
  password = 'password'

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onLogin() {
    if (!this.loginForm.valid) {
      return
    }
    if(this.loginForm.value.email == this.email && this.loginForm.value.password == this.password){
      this.router.navigate(['/weather']);
    }else{
      alert("Invalid credentials!")
    }
  }
}
