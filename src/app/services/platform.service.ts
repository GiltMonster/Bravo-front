import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  platform: Platform;

  constructor(
    platform: Platform
  ) {
    this.platform = platform;
  }

  isMobile(): boolean {
    return this.platform.is('mobile');
  }
}
