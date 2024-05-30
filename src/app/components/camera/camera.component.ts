import { Component } from '@angular/core';
import { CameraCheckService } from '../../services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  requireDistanceLight = false;
  requiredDistanceRange: [number, number] = [0, 0]; // Initial values
  requiredLightRange: [number, number] = [0, 0]; // Initial values
  hardwareCameras: [[number, number], [number, number]][] = [
    [[1, 5], [100, 150]],
    [[5, 10], [150, 200]],
    [[1, 10], [50, 150]],
  ];
  result: any;
  data: any;
  matchCameras: any;

  constructor(private cameraCheckService: CameraCheckService) {}

  onSubmit() {
    this.requireDistanceLight = true;
    this.result = this.cameraCheckService.canConstructSoftwareCamera(
      this.requiredDistanceRange,
      this.requiredLightRange,
      this.hardwareCameras

    );
    this.matchCameras = this.findMatchingIndices(this.hardwareCameras,this.result)
  }
  arraysEqual(a:any, b:any){
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (Array.isArray(a[i]) && Array.isArray(b[i])) {
        if (!this.arraysEqual(a[i], b[i])) return false;
      } else if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  };

  findMatchingIndices(arr1:[[number, number], [number, number]][], arr2:[[number, number], [number, number]][]){
    const matchedIndices = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (this.arraysEqual(arr1[i], arr2[j])) {
          matchedIndices.push(i);
        }
      }
    }
    return matchedIndices;
  };
}
