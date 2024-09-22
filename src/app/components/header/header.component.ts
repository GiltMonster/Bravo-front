import { Component, OnInit } from '@angular/core';
import { IonButton, IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonToolbar, IonHeader,  IonButton ],
  standalone: true,
})
export class HeaderComponent {

  constructor() { }

}
