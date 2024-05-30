import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DeadlineService } from '../../services/deadline.service';


@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownTimerComponent implements  OnInit {
  private secondsLeftSubject = new BehaviorSubject<number>(0);
  secondsLeft$: Observable<number> = this.secondsLeftSubject.asObservable();
  formattedTime: string;
  constructor(private deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.deadlineService.getDeadline().pipe(
      tap((data: { secondsLeft: number }) => this.secondsLeftSubject.next(data.secondsLeft)),
      switchMap(() => interval(1000).pipe(
        tap(() => {
          const currentValue = this.secondsLeftSubject.getValue();
          if (currentValue > 0) {
            this.secondsLeftSubject.next(currentValue - 1);
          }
          this.formatRemainingTime(currentValue)
        })
      ))
    ).subscribe();


  }

  formatRemainingTime(seconds: number): void {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    this.formattedTime = `${days} Day(s) ${hours} hrs ${minutes} min ${remainingSeconds} sec`;
  }
}
