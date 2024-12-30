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
    this.token = localStorage.getItem('token');
    if (!this.token) {
      console.log("Token don't get it");
      this.router.navigate(['login']);
      return;
    }
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
