import { Component, Input, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/services/platform.service';
import { IonCard, IonIcon, IonLabel, IonCardHeader, IonCardTitle, IonCardContent, IonSkeletonText, IonImg } from "@ionic/angular/standalone";
import Category from 'src/app/interfaces/Category';
import { Router } from '@angular/router';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { FormatPromoPipe } from 'src/app/pipes/format-promo.pipe';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';
import { addIcons } from 'ionicons';
import { carSportOutline } from 'ionicons/icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonImg, IonSkeletonText, IonCardContent, IonCardTitle, IonCardHeader, IonLabel, IonIcon, IonCard, FormatPricePipe, FormatPromoPipe, SkeletonCardComponent],
  standalone: true,
})
export class CardComponent{

  @Input() categories: Category[] = [];
  @Input() isLoaded: boolean = false;

  categoriesSkeleton = Array(6).fill(0);

  isMobile: boolean;

  constructor(
    platformService: PlatformService,
    private router: Router
  ) {
    addIcons({carSportOutline});
    this.isMobile = platformService.isMobile();
    console.log(this.categories);
  }


  goToDesc(id: number) {
    this.isMobile ? this.router.navigate(['/mobile/tabs/page/produto/', id]) : this.router.navigate(['/desc/produto/', id]);
  }



}
