import { Component, Input, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/services/platform.service';
import { IonCard, IonIcon, IonLabel, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonCardContent, IonSkeletonText } from "@ionic/angular/standalone";
import Category from 'src/app/interfaces/Category';
import { Router } from '@angular/router';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { FormatPromoPipe } from 'src/app/pipes/format-promo.pipe';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonSkeletonText, IonCardContent, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonLabel, IonIcon, IonCard, FormatPricePipe, FormatPromoPipe, SkeletonCardComponent],
  standalone: true,
})
export class CardComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() isLoaded: boolean = false;

  isMobile: boolean;

  constructor(
    platformService: PlatformService,
    private router: Router
  ) {
    this.isMobile = platformService.isMobile();
  }

  ngOnInit(): void {
    console.log(this.categories);
  }

  goToDesc(id: number) {
    this.isMobile ? this.router.navigate(['/mobile/tabs/desc/produto/', id]) : this.router.navigate(['/desc/produto/', id]);
  }



}
