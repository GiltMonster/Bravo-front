import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { addIcons } from 'ionicons';
import { information, location } from 'ionicons/icons';

@Component({
  selector: 'app-accont',
  templateUrl: './accont.page.html',
  styleUrls: ['./accont.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonIcon, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AccontPage implements OnInit {

  userAuthenticated: User = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: ''
  };

  isMobile: boolean = this.platformService.isMobile();

  constructor(
    private platformService: PlatformService,
    private authService: AuthLoginService,
    private router: Router
  ) {
    addIcons({ location, information })
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe(
      (response) => {
        this.userAuthenticated = response;
        console.log(this.userAuthenticated.name);

      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }

  enderecos() {
    this.router.navigate(['/enderecos']);
  }

  pedidos() {
    throw new Error('Rota não implementada');
    this.router.navigate(['/pedidos']);
  }

  informacoesPerfil() {
    this.router.navigate(['/info-perfil']);
  }

}
