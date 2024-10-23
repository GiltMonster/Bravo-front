import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { User } from 'src/app/interfaces/User';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonToolbar, IonHeader, IonButton],
  standalone: true,
})
export class HeaderComponent {

  userAuthenticated: User | boolean = false;

  constructor(
    private router: Router,
    private authService: AuthLoginService
  ) {

    this.authService.verifyToken().subscribe((user) => {
      this.userAuthenticated = true;

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

  logout() {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['/']);
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }

}
