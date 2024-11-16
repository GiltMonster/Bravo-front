import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonHeader, IonToolbar, IonBadge, IonLabel } from "@ionic/angular/standalone";
import { User } from 'src/app/interfaces/User';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import { CarrinhoService } from 'src/app/services/produto/carrinho.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonLabel, IonBadge, IonToolbar, IonHeader, IonButton],
  standalone: true,
})
export class HeaderComponent implements OnInit {

  userAuthenticated: User | boolean = false;
  itensLength: number = 0;

  constructor(
    private router: Router,
    private authService: AuthLoginService,
    private carrinhoService: CarrinhoService
  ) {
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe((user) => {
      this.userAuthenticated = true;

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

      this.userAuthenticated = false;
    });
  }

  home() {
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  carrinho() {
    this.router.navigate(['/carrinho']);
  }

  logout() {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['/']);
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }

}
