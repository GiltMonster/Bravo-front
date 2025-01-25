import { Component, OnInit } from '@angular/core';
import { IonCard, IonSkeletonText, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-skeleton-card',
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./skeleton-card.component.scss'],
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonSkeletonText],
  standalone: true,
})
export class SkeletonCardComponent {

  isMobile = this.platformService.isMobile();

  constructor(
    private platformService: PlatformService,
  ) { }


}
