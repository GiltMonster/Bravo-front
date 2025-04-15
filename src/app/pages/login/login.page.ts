import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonInput, IonCard, IonIcon, IonToast, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { addIcons } from 'ionicons';
import { closeCircle, lockClosed, lockOpen, mail } from 'ionicons/icons';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import Message from 'src/app/interfaces/Message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonToast, IonIcon, IonCard, IonInput, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule,]
})
export class LoginPage implements OnInit {

  isMobile = this.platformService.isMobile();

  msg: Message = { message: '', token: '' };
  isToastOpen: boolean = false;
  isError: boolean = false;
  isDisable: boolean = true;

  protected loginForms = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  constructor(
    private platformService: PlatformService,
    private authService: AuthLoginService,
    protected formBuilder: NonNullableFormBuilder,
    private router: Router
  ) {
    addIcons({ lockClosed, mail, lockOpen, closeCircle });
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe(() => {
      this.isMobile ? this.router.navigate(['mobile/tabs/perfil']) : this.router.navigate(['/']);
    });
  }

  login() {
    this.isDisable = false;
    const user = {
      email: this.loginForms.get('email')!.value,
      password: this.loginForms.get('password')!.value,
    }

    this.authService.login(user.email, user.password).subscribe(
      (response: Message) => {

        localStorage.setItem('token', JSON.stringify(response.token));
        this.msg = response;
        this.setOpen(true);
        this.isError = false;
        this.loginForms.reset();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        this.isMobile ? this.router.navigate(['mobile/tabs/home']) : this.router.navigate(['/']);
      },
      (error) => {
        this.msg = error.error
        this.isError = true;
        this.setOpen(true);
        this.isDisable = true;
      }
    );
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  goToRegister() {
    this.isMobile ? this.router.navigate(['mobile/tabs/page/register']) : this.router.navigate(['/register']);
  }

}
