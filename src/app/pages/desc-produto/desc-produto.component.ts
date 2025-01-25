import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonContent, IonLabel, IonHeader, IonToolbar, IonTitle, IonSkeletonText, IonButton, IonIcon, IonToast, IonCard, IonCardTitle, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";
import Product from 'src/app/interfaces/Product';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { ProdutoService } from 'src/app/services/home/produto.service';
import { PlatformService } from 'src/app/services/platform.service';
import { addIcons } from 'ionicons';
import { basketOutline, cartOutline, cashOutline, carSportOutline, save, closeCircle, bagAdd } from 'ionicons/icons';
import { CarrinhoService } from 'src/app/services/produto/carrinho.service';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import Message from 'src/app/interfaces/Message';

@Component({
  selector: 'app-desc-produto',
  templateUrl: './desc-produto.component.html',
  styleUrls: ['./desc-produto.component.scss'],
  imports: [IonCardContent, IonCardHeader, IonCardTitle, IonToast, IonIcon, IonButton, IonSkeletonText, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, CommonModule, RouterModule, FormatPricePipe, IonCard],
  standalone: true
})
export class DescProdutoComponent {

  id = this.route.snapshot.paramMap.get('id');
  indexImagem: number = 0;
  isMobile: boolean = this.platformService.isMobile();
  isLoaded: boolean = false;

  msg: Message = { message: '', usuario: '' };
  isToastOpen: boolean = false;
  isError: boolean = false;


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
    addIcons({ cartOutline, cashOutline, basketOutline, carSportOutline, closeCircle, bagAdd });
    this.getProductById();

  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
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
            this.msg = data;
            this.setOpen(true);
            this.isError = false;
          },
          (error) => {
            this.msg = error.error
            this.isError = true;
            this.setOpen(true);
          }
        );
      },
      (error) => {
        this.msg = error.error
        this.isError = true;
        this.setOpen(true);
        this.isMobile ? this.router.navigate(['mobile/tabs/login']) : this.router.navigate(['/login']);
      });
  }

}
