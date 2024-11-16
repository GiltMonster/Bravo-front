import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonContent, IonLabel, IonHeader, IonToolbar, IonTitle, IonSkeletonText, IonButton, IonIcon } from "@ionic/angular/standalone";
import Product from 'src/app/interfaces/Product';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { ProdutoService } from 'src/app/services/home/produto.service';
import { PlatformService } from 'src/app/services/platform.service';
import { addIcons } from 'ionicons';
import { basketOutline, cartOutline, cashOutline, carSportOutline } from 'ionicons/icons';
import { CarrinhoService } from 'src/app/services/produto/carrinho.service';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';

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
  isMobile: boolean = this.platformService.isMobile();
  isLoaded: boolean = false;

  produto: Product = {
    id: 0,
    nome: '',
    descricao: '',
    preco: "",
    desconto: "",
    estoque: 0,
    indisponivel: false,
    imagens: [
      {
        id: 0,
        url: "",
        order: 0
      }
    ]
  };

  constructor(
    private platformService: PlatformService,
    private productService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private authService: AuthLoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ cartOutline, cashOutline, basketOutline, carSportOutline });
    this.getProductById();

  }

  getProductById() {
    this.productService.getProductById(String(this.id)).subscribe((data) => {
      this.produto = data;
      this.isLoaded = true;
    });
  }

  selectImg(index: number, event: any) {
    this.indexImagem = index;
    const target = event.target as HTMLElement;
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  addCarrinho(produto_id: number, quantidade: number = 1) {
    this.authService.verifyToken().subscribe(
      (data) => {
        this.carrinhoService.addItemCarrinho(data.id!, produto_id, quantidade).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/login']);
      });
  }

}
