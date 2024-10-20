import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonCard, IonIcon } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { addIcons } from 'ionicons';
import { lockClosed, mail } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCard, IonInput, IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule,]
})
export class LoginPage {

  isMobile = this.platformService.isMobile();

  constructor(
    private platformService: PlatformService
  ) { addIcons({ lockClosed, mail }); }

  loginForms = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    console.log(this.loginForms.value);
  }


}
