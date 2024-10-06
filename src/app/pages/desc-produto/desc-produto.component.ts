import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonContent, IonLabel, IonHeader, IonToolbar, IonTitle, IonSkeletonText, IonButton, IonIcon } from "@ionic/angular/standalone";
import Product from 'src/app/interfaces/Product';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { ProdutoService } from 'src/app/services/home/produto.service';
import { PlatformService } from 'src/app/services/platform.service';
import { addIcons } from 'ionicons';
import { cartOutline, cashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-desc-produto',
  templateUrl: './desc-produto.component.html',
  styleUrls: ['./desc-produto.component.scss'],
  imports: [IonIcon, IonButton, IonSkeletonText, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, CommonModule, RouterModule, FormatPricePipe],
  standalone: true
})
export class DescProdutoComponent {

  id = this.route.snapshot.paramMap.get('id');
  indexImagem: number = 0;
  isMobile: boolean;
  isLoaded: boolean = false;

  produto: Product = {
    id: 0,
    nome: '',
    descricao: '',
    preco: "",
    desconto: "",
    estoque: 0,
    imagens: [
      {
        id: 0,
        url: "",
        order: 0
      }
    ]
  };

  constructor(
    platformService: PlatformService,
    private productService: ProdutoService,
    private route: ActivatedRoute
  ) {
    addIcons({cartOutline, cashOutline});
    this.isMobile = platformService.isMobile();
    this.getProductById();

  }

  getProductById() {
    this.productService.getProductById(String(this.id)).subscribe((data) => {
      this.produto = data;
      this.isLoaded = true;
    });
  }

  selectImg(index: number, event:any) {
    this.indexImagem = index;
    const target = event.target as HTMLElement;
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

  }

}
