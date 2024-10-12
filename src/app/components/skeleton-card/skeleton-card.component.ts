import { Component, OnInit } from '@angular/core';
import { IonCard, IonSkeletonText, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-skeleton-card',
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./skeleton-card.component.scss'],
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonSkeletonText],
  standalone: true,
})
export class SkeletonCardComponent {

  constructor() { }


}
