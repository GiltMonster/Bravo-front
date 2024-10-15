import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PlatformService } from 'src/app/services/platform.service';
import { PesquisaComponent } from "../../components/pesquisa/pesquisa.component";
import { CardComponent } from "../../components/card/card.component";
import Category from 'src/app/interfaces/Category';
import { ProdutoService } from 'src/app/services/home/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, HeaderComponent, PesquisaComponent, CardComponent],
})
export class HomePage implements OnInit {

  isMobile: boolean;
  isLoaded: boolean = false;

  categoriesWithProducts: Category[] = [];
  categoriesWithProductsSec: Category[] = [];

  constructor(
    private produtoService: ProdutoService,
    platformService: PlatformService
  ) {
    this.isMobile = platformService.isMobile();
  }

  ngOnInit(): void {
    this.sendHomeData();
  }

  sendHomeData() {
    this.produtoService.getHomeData().subscribe(((data) => {
      this.categoriesWithProducts = data;
      this.categoriesWithProductsSec = data;
      this.isLoaded = true;
    }));
  }

  updateCategories(categories: string[]) {
    if (categories.length === 0) {
      this.categoriesWithProducts = this.categoriesWithProductsSec;
    }else{
      this.categoriesWithProducts = this.categoriesWithProducts.filter((category) => {
        return categories.includes(category.nome);
      });
    }
  }


}
