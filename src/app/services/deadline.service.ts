import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  // private apiUrl = '/api/deadline';

  constructor() {}

  getDeadline(): Observable<{ secondsLeft: number }> {
        // Target date and time
        const targetDate:any = new Date("2024-06-04T08:00:00");

        // Current date and time
        const currentDate:any = new Date();

        // Calculate the difference in milliseconds
        const difference:any = targetDate - currentDate;

        // Convert milliseconds to seconds
        const remainingSeconds = Math.floor(difference / 1000);

    // Simulate API response with a delay
    return of({ secondsLeft: remainingSeconds }).pipe(delay(500)); // 1 hour countdown with 500ms delay
  }
}
