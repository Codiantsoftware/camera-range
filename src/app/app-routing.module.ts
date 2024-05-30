import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { CameraComponent } from './components/camera/camera.component';


const routes: Routes = [
  { path: '', redirectTo: 'count-down', pathMatch: 'full' },
  { path: 'count-down', component: CountdownTimerComponent },
  { path: 'camera', component: CameraComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

