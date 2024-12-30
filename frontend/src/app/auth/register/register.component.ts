import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Users } from '../../models/users.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup = new FormGroup('');

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const newUser: Users = {
        username: form.value.username,
        password: form.value.password,
      };

      this.apiService.createUser(newUser).subscribe({
        next: (user) => {
          console.log(`User created: `, user);
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
    } else {
      // Nada
    }
  }
}
