import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  value: string = '';
  username: string | null = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    let message = this.apiService.getMessage();
    message.subscribe((mes) => {
      console.log(mes);
      this.value = mes;
    });

    this.apiService.getUseranmeObservable().subscribe((username) => {
      this.username = username;
    });

    this.apiService.updateUsername();
  }

  logout() {
    localStorage.removeItem('token');
    this.apiService.updateUsername();
  }
}
