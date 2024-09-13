import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PlatformService } from 'src/app/services/platform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, HeaderComponent],
})
export class HomePage {

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
