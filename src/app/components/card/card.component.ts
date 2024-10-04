import { Component, Input, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/services/platform.service';
import { IonCard, IonIcon, IonLabel, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonCardContent } from "@ionic/angular/standalone";
import Category from 'src/app/interfaces/Category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonCardContent, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonLabel, IonIcon, IonCard],
  standalone: true,
})
export class CardComponent implements OnInit {

  @Input() categories: Category[] = [];

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
    this.isMobile ? this.router.navigate(['/mobile/desc/produto/', id]) : this.router.navigate(['/desc/produto/', id]);
  }

  formatPrice(price: string) {
    return parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatPromo(price: string, discount: string) {
    return (parseFloat(price) - parseFloat(discount)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }


}
