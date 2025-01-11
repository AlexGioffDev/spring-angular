import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-private',
  imports: [],
  templateUrl: './private.component.html',
  styleUrl: './private.component.css',
})
export class PrivateComponent implements OnInit {
  token?: String | null;

  data?: String;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.checkToken();
  }

  logoutAndRedirect() {
    localStorage.removeItem('token');
    return this.router.navigate(['login']);
  }

  checkToken() {
    this.apiService.validToken().subscribe({
      next: (isValid: boolean) => {
        if (!isValid) {
          this.logoutAndRedirect();
        }
      },
      error: (error) => {
        this.logoutAndRedirect();
      },
    });
  }

  getValue() {
    this.apiService.privateData().subscribe({
      next: (value: string) => {
        this.data = value;
      },
      error: (error) => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      },
    });
  }
}
