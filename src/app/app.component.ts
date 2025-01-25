import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { PlatformService } from './services/platform.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonContent, IonApp, IonRouterOutlet, HeaderComponent],
})
export class AppComponent {

  isMobile = this.platformService.isMobile();

  constructor(
   private platformService: PlatformService,
   private router: Router,
  ) {
    this.isMobile ? this.router.navigate(['/mobile/tabs/home']) : this.router.navigate(['/']);
  }
}
