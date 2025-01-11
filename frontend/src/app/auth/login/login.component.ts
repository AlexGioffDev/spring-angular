import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Users } from '../../models/users.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup('');

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const userData: Users = {
        username: form.value.username,
        password: form.value.password,
      };

      this.apiService.login(userData).subscribe({
        next: (token) => {
          localStorage.setItem('token', token);
          this.router.navigate(['private']);
          this.apiService.updateUsername();
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
    }

    this.apiService;
  }
}
