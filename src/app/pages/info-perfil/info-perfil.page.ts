import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonIcon, IonCard, IonToast, IonButton, IonInput, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/interfaces/User';
import Message from 'src/app/interfaces/Message';
import { addIcons } from 'ionicons';
import { closeCircle, idCard, lockClosed, mail, people, save } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';

@Component({
  selector: 'app-info-perfil',
  templateUrl: './info-perfil.page.html',
  styleUrls: ['./info-perfil.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonToast, IonCard, IonIcon, IonInput, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class InfoPerfilPage implements OnInit {

  isMobile: boolean = this.platformService.isMobile();
  user: User = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
  }

  msg: Message = { message: '', usuario: '' };
  isToastOpen: boolean = false;
  isError: boolean = false;
  isDisable: boolean = true;


  protected updateAccountForms = this.formBuilder.group({
    name: this.formBuilder.control(this.user.name, { validators: [Validators.required] }),
    cpf: this.formBuilder.control(this.user.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    email: this.formBuilder.control(this.user.email, [Validators.required, Validators.email]),
    currentPassword: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
    confirmPassword: this.formBuilder.control('', [Validators.required]),
  }, { validators: this.passwordsMatchValidator });

  constructor(
    private platformService: PlatformService,
    private userService: UserService,
    protected formBuilder: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthLoginService
  ) {
    addIcons({ lockClosed, mail, people, idCard, save, closeCircle });
  }

  ionViewWillEnter() {
    this.authService.verifyToken().subscribe(
      (response) => {
        this.getUser(response.id!);
      }, (error) => {
        this.isMobile ? this.router.navigate(['mobile/tabs/login']) : this.router.navigate(['/login']);
      }
    );
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  applyCpfMask(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o hífen

    // Atualiza o valor do campo de entrada
    this.updateAccountForms.get('cpf')?.setValue(value, { emitEvent: false });
  }

  removeMask(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  updateAccount() {
    this.isDisable = false;

    const user: User = {
      id: this.user.id,
      name: this.updateAccountForms.get('name')!.value,
      cpf: this.removeMask(this.updateAccountForms.get('cpf')!.value),
      email: this.updateAccountForms.get('email')!.value.toLowerCase(),
      password: this.updateAccountForms.get('currentPassword')!.value,
      newPassword: this.updateAccountForms.get('password')!.value
    };

    this.userService.updateUser(user).subscribe(
      (response) => {
        this.msg = { message: 'Usuário atualizado com sucesso!', usuario: user.name };
        this.isToastOpen = true;
        this.isError = false;

        this.updateAccountForms.reset();
        this.authService.logout();
        window.location.reload();
        this.router.navigate(['/login']);

      },
      (error) => {
        this.msg = { message: 'Erro ao atualizar o usuário!', usuario: user.name };
        this.isToastOpen = true;
        this.isError = true;
        this.isDisable = true;
        console.log("erro:", error);

      });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  getUser(id: string) {
    this.userService.getUser(id).subscribe(
      (response) => {
        this.user = response;
        this.user.cpf = this.user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

        this.updateAccountForms.get('name')!.setValue(this.user.name);
        this.updateAccountForms.get('cpf')!.setValue(this.user.cpf);
        this.updateAccountForms.get('email')!.setValue(this.user.email);

      },
      (error) => {
        console.log(error);
      });
  }

  cancel() {
    this.updateAccountForms.reset();
    this.isMobile ? this.router.navigate(['mobile/tabs/perfil']) : this.router.navigate(['/perfil']);
  }

}
