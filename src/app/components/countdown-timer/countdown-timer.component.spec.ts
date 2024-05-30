import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownTimerComponentComponent } from './countdown-timer.component';

describe('CountdownTimerComponentComponent', () => {
  let component: CountdownTimerComponentComponent;
  let fixture: ComponentFixture<CountdownTimerComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountdownTimerComponentComponent]
    });
    fixture = TestBed.createComponent(CountdownTimerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
