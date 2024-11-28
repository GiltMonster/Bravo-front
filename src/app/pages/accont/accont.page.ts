import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonList, IonItem, IonLabel, IonItemDivider, IonAlert, IonSkeletonText } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { addIcons } from 'ionicons';
import { bagCheck, information, location, logOut } from 'ionicons/icons';

@Component({
  selector: 'app-accont',
  templateUrl: './accont.page.html',
  styleUrls: ['./accont.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonAlert, IonItemDivider, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonIcon, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardSubtitle]
})
export class AccontPage implements OnInit {

  userAuthenticated: User = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: ''
  };

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.authService.logout();
        this.router.navigate(['/mobile/tabs/home']).then(() => {
          window.location.reload();
        });
      },
    },
  ];

  isMobile: boolean = this.platformService.isMobile();

  constructor(
    private platformService: PlatformService,
    private authService: AuthLoginService,
    private router: Router
  ) {
    addIcons({ location, information, bagCheck, logOut })
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe(
      (response) => {
        this.userAuthenticated = response;
        console.log(this.userAuthenticated.name);

      },
      (error) => {
        this.isMobile ? this.router.navigate(['mobile/tabs/login']) : this.router.navigate(['/login']);
      }
    );
  }

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  enderecos() {
    this.isMobile ? this.router.navigate(['mobile/tabs/page/enderecos']) : this.router.navigate(['/enderecos']);
  }

  pedidos() {
    this.isMobile ? this.router.navigate(['mobile/tabs/page/pedidos']) : this.router.navigate(['/pedidos']);
  }

  informacoesPerfil() {
    this.isMobile ? this.router.navigate(['mobile/tabs/page/info-perfil']) : this.router.navigate(['/info-perfil']);
  }

}
