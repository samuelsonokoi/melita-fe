import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  passwordRegex = new RegExp(
    '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,}$'
  );
  hide = true;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
    });
  }

  onLogin = () => {
    this.loading = true;
    const { username, password } = this.loginForm.value;
    const data: ILogin = {
      username,
      password,
    };
    this.authService.login(data);
  };

  getErrorMessage = (control: AbstractControl | null) => {
    if (control?.hasError('required')) {
      return 'You must enter a value.';
    }

    if (control?.hasError('minlength')) {
      return 'You must enter at least 2 characters.';
    }

    if (control?.hasError('pattern')) {
      return 'Password must contain an uppercase, lowercase, number and a symbol';
    }

    return;
  };

  togglePassword = () => {
    this.hide = !this.hide;
  };
}
