import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bag, home, person } from 'ionicons/icons';
import { User } from 'src/app/interfaces/User';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);

  authUser: User | boolean = false;

  constructor(
    private authService: AuthLoginService
  ) {
    addIcons({ home, bag, person });
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe((user) => {
      this.authUser = true;
    },
      (error) => {
        console.log("Erro de autenticação", error);
        this.authUser = false;
      }
    );
  }

}
