import { Component, Input } from '@angular/core';
import { PlatformService } from 'src/app/services/platform.service';
import { IonCard, IonIcon, IonLabel, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from "@ionic/angular/standalone";
import Category from 'src/app/interfaces/Categories';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonLabel, IonIcon, IonCard],
  standalone: true,
})
export class CardComponent {

  @Input() categorias = [{
    id: '',
    active: false,
    name: '',
    description: '',
    image: ''
  }];

  @Input() produtos = [{
    id: 0,
    name: '',
    produto_desc: '',
    price: 0,
    produto_desconto: 0,
    imagem_produto: [{
      imagem_id: 0,
      imagem_ordem: 0,
      imagem_url: ''
    },]
  }]

  @Input() typeCard?: string;

  isMobile: boolean;

  constructor(
    platformService: PlatformService,
    private router: Router
  ) {
    this.isMobile = platformService.isMobile();
  }

  goToDesc(id: number) {
    this.router.navigate(['/desc/produto/', id]);


  }


}
