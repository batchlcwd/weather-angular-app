import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { HighlightDirective } from '../../directives/highlight.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-current',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    AngularToastifyModule,
    HighlightDirective,
    TooltipDirective
  ],
  templateUrl: './current.component.html',
  styleUrl: './current.component.css',
})
export class CurrentComponent {
  watherData: any;
  selectedCity: string = 'Delhi,India';
  constructor(
    private weatherService: WeatherService,
    private toastService: ToastService
  ) {
    this.getData();
  }

  getCityWeather() {
    this.getData();
  }

  getData() {
    this.weatherService.getCurrentWeather(this.selectedCity).subscribe({
      next: (data) => {
        console.log(data);
        this.watherData = data;
        this.toastService.success('Weather data fetched successfully!');
      },
      error: (err) => {
        console.error('Error fetching current weather:', err);
        this.toastService.error(
          'Failed to fetch weather data. Please try again later.'
        );
      },
    });
  }
}
