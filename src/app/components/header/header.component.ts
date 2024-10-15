import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonToolbar, IonHeader,  IonButton ],
  standalone: true,
})
export class HeaderComponent {

  constructor(
    private router: Router
  ) { }

  home() {
    this.router.navigate(['/']);
  }
  login() {
    this.router.navigate(['/login']);
  }

}
