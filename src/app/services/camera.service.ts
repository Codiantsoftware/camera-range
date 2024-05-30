import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraCheckService {

  constructor() { }
  private getCoverage(
    [minDistRequired, maxDistRequired]: [number, number],
    [minLightRequired, maxLightRequired]: [number, number],
    cameraRanges: [[number, number], [number, number]][]
  ): [[number, number], [number, number]][] | boolean {
    const validCameraRanges = cameraRanges.filter(([distRange, lightRange]) => {
      const [distStart, distEnd] = distRange;
      const [lightStart, lightEnd] = lightRange;

      const distInRange = minDistRequired >= distStart && minDistRequired <= distEnd;
      const lightInRange = minLightRequired >= lightStart && minLightRequired <= lightEnd;

      const lastDistInRange = maxDistRequired >= distStart && maxDistRequired <= distEnd;
      const lastLightInRange = maxLightRequired >= lightStart && maxLightRequired <= lightEnd;

      return (distInRange && lightInRange) || (lastDistInRange && lastLightInRange);
    });

    return validCameraRanges.length ? validCameraRanges :  false;
  }

  canConstructSoftwareCamera(
    requiredDistanceRange: [number, number],
    requiredLightRange: [number, number],
    hardwareCameras: [[number, number], [number, number]][]
  ): [[number, number], [number, number]][] | boolean {
    return this.getCoverage(requiredDistanceRange, requiredLightRange, hardwareCameras);
  }
}
