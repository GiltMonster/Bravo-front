import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bag, home, person } from 'ionicons/icons';
import { User } from 'src/app/interfaces/User';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import { CarrinhoService } from 'src/app/services/produto/carrinho.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonBadge, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);

  authUser: User | boolean = false;
  itensLength: number = 0;


  constructor(
    private authService: AuthLoginService,
    private carrinhoService: CarrinhoService
  ) {
    addIcons({ home, bag, person });
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe((user) => {
      this.authUser = true;

      // Inscreve-se no BehaviorSubject para acompanhar o número de itens
      this.carrinhoService.itensLength$.subscribe(length => {
        this.itensLength = length;
      });

      // Carrega o carrinho inicialmente
      this.carrinhoService.listaCarrinho(user.id!).subscribe((data) => {
        this.itensLength = data.length;
      });

    }, (error) => {
      console.log("Erro de autenticação", error);

      this.authUser = false;
    });
  }

}
