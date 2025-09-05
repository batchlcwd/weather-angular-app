import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://api.weatherapi.com/v1/';
  apiKey = '70eda467c1494dd992a151714250406';

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}`
    );
  }
  getForecast(city: string, days: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=${days}`
    );
  }

  getTodos() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<Todo[]>(url).pipe(
      //mapping response
      map((response) => response.map((todo) => todo.title)),
      //error handling
      catchError((error) => {
        console.log('Error occurred:', error);
        return of([]);
      })
    );
  }
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
