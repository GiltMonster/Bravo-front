import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList, IonCard, IonCardContent, IonItem, IonThumbnail, IonIcon, IonButton } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/produto/pedido.service';
import { User } from 'src/app/interfaces/User';
import Pedido from 'src/app/interfaces/pedido/Pedido';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { addIcons } from 'ionicons';
import { carSportOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonThumbnail, IonItem, IonCardContent, IonCard, IonList, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FormatPricePipe]
})
export class PedidosPage implements OnInit {

  ismobile = this.platformService.isMobile();
  usuario = {} as User;
  pedidos: Pedido[] = [];

  constructor(
    private platformService: PlatformService,
    private authService: AuthLoginService,
    private router: Router,
    private pedidoService: PedidoService
  ) {
    addIcons({carSportOutline});
   }

  ngOnInit(): void {
    this.ionViewWillEnter();
  }

  ionViewWillEnter(): void {
    this.authService.verifyToken().subscribe(
      (response) => {
        this.getItensCompra(response.id!);
        this.usuario = response;
        console.log(this.usuario);

      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }

  getItensCompra(id_user: string) {
    this.pedidoService.getListaPedidos(id_user).subscribe(
      (response) => {
        this.pedidos = response;
        console.log(this.pedidos);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  calcTotalValorPedido(pedido: Pedido) {
    let total = 0;
    pedido.pedido_itens.forEach(item => {
      total += parseFloat(item.produto_preco_total);
    });
    return total.toString();
  }

  calcValorUnitario(produto_preco: string, produto_qtd: number) {
    return Number(produto_preco) / Number(produto_qtd);
  }

  goToProduto(produto_id: number) {
    this.router.navigate(['/desc/produto', produto_id]);
  }

}
