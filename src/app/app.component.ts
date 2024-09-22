import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PlatformService } from './services/platform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  isMobile: boolean;

  constructor(
    platformService: PlatformService,
    router: Router,
  ) {

    this.isMobile = platformService.isMobile();

    if (this.isMobile) {
      router.navigate(['/mobile/tabs/home']);
    }
  }
}
