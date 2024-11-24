import { Component, OnInit } from '@angular/core';
import { IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonLabel],
  standalone: true,
})
export class FooterComponent {

  constructor() { }


}
