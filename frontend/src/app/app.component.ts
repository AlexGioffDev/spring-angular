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
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    let message = this.apiService.getMessage();
    message.subscribe((mes) => {
      console.log(mes);
      this.value = mes;
    });
  }
}
