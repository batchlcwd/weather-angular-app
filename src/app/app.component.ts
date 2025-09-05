import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './components/current/current.component';
import { ForcastComponent } from "./components/forcast/forcast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, CommonModule, CurrentComponent, ForcastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-app';

  user!: any;

  imageUrl = '/assets/bg_app.jpg';

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.user = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });

    console.log('Data fetched successfully');
  }
}
