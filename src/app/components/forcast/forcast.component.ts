import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  fromEvent,
  map,
  mergeMap,
  Observable,
  of,
  retry,
  Subscription,
  switchMap,
} from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';
import { HighlightDirective } from '../../directives/highlight.directive';
import { MaskTextPipe } from '../../pipes/mask-text.pipe';

@Component({
  selector: 'app-forcast',
  imports: [CommonModule, HighlightDirective, MaskTextPipe],
  templateUrl: './forcast.component.html',
  styleUrl: './forcast.component.css',
  standalone: true,
})
export class ForcastComponent implements OnInit {
  searchControl = new FormControl('');

  // variables for pip examples"

  today = new Date();
  companyName = 'substring technologies';
  price = 100;
  obj = {
    name: 'shashi',
    role: 'admin',
  };

  brandName = 'LCWD';

  cardNumber = '123456789';

  constructor(
    private httpClient: HttpClient,
    private weatherService: WeatherService
  ) {
    // api call

    this.weatherService.getTodos().subscribe({
      next: (data) => {
        console.log('Data received:', data);
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
      complete: () => {
        console.log('Request completed');
        // Unsubscribe to avoid memory leaks
      },
    });

    //rxjs--> rective programming

    // document.addEventListener('click', () => {
    //   console.log('Clicked');
    // });

    // fromEvent(document, 'click').subscribe({
    //   next: (event) => {
    //     console.log('Event received:', event);
    //   },
    //   error: (error) => {
    //     console.error('Error occurred:', error);
    //   },
    //   complete: () => {
    //     console.log('Event stream completed');
    //   },
    // });

    /*


    HttpClient : api calling module:

    rxjs: reactive programming library

    */

    // of(1, 2, 3, 4).subscribe((data) => console.log);
  }
  ngOnInit(): void {
    // this.searchControl.valueChanges
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     switchMap((query) => this.weatherService.getTodos())
    //   )
    //   .subscribe((result) => console.log(result));
    // this.weatherService
    //   .getCurrentWeather('delhi')
    //   .pipe(
    //     mergeMap(
    //       (data) => this.weatherService.getTodos(),
    //       (data) => this.weatherService.getCurrentWeather('lucknow')
    //     )
    //   )
    //   .subscribe();
    //switchMap: single api call: switches to the latest observable
    // mergetMap: multiple api calls parrallelly: merges the results of multiple observables
    // concatMap: Sequence of Dependent Calls

    //   this.weatherService
    //     .getCurrentWeather('delrwwwegweghi')
    //     .pipe(
    //       retry(3),
    //       catchError((error) => {
    //         console.error('Error occurred:', error);
    //         return of({ error: 'Failed to fetch data' });
    //       })
    //     )
    //     .subscribe((data) => console.log(data));
    // }

    //forJoin :

    forkJoin({
      call1: this.weatherService.getCurrentWeather('delhi'),
      call2: this.weatherService.getCurrentWeather('lucknow'),
      call3: this.weatherService.getCurrentWeather('mumbai'),
    }).subscribe((result) => {
      console.log('ForkJoin Result:', result);
    });
  }
}
