import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { PesquisaComponent } from "../../components/pesquisa/pesquisa.component";
import { CardComponent } from "../../components/card/card.component";
import Category from 'src/app/interfaces/Category';
import { ProdutoService } from 'src/app/services/home/produto.service';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, PesquisaComponent, CardComponent, FooterComponent, IonLabel],
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
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.getHomeData();
  }

  getHomeData() {
    this.produtoService.getHomeData().subscribe(((data) => {
      this.categoriesWithProducts = data;
      this.categoriesWithProductsSec = data;
      this.isLoaded = true;
    }));
  }

  cancelarPesquisa() {
    this.categoriesWithProducts = this.categoriesWithProductsSec;
  }

  updateCategories(categories: string[] | Category[]) {

    if (Array.isArray(categories) && typeof categories[0] === 'string') {

      if (categories.length === 0) {
        this.categoriesWithProducts = this.categoriesWithProductsSec;
      } else {
        this.categoriesWithProducts = this.categoriesWithProducts.filter((category) => {
          return (categories as string[]).includes(category.nome);
        });
      }

    } else {
      this.categoriesWithProducts = categories as Category[];
    }
  }

}
