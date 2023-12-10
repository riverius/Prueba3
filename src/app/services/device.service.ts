import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
