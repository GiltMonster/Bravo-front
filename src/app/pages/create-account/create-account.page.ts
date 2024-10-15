import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { addIcons } from 'ionicons';
import { idCard, lockClosed, mail, people } from 'ionicons/icons';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateAccountPage {

  isMobile = this.platformService.isMobile();

  protected createAccountForms = this.formBuilder.group({
    name: this.formBuilder.control('', { validators: [Validators.required] }),
    cpf: this.formBuilder.control('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
    confirmPassword: this.formBuilder.control('', [Validators.required]),
  }, { validators: this.passwordsMatchValidator });

  constructor(
    private platformService: PlatformService,
    private userService: UserService,
    protected formBuilder: NonNullableFormBuilder
  ) {
    addIcons({ lockClosed, mail, people, idCard });
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
    this.createAccountForms.get('cpf')?.setValue(value, { emitEvent: false });
  }

  removeMask(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  createAccount() {
    const user: User = {
      name: this.createAccountForms.get('name')!.value,
      cpf: this.removeMask(this.createAccountForms.get('cpf')!.value),
      email: this.createAccountForms.get('email')!.value.toLowerCase(),
      password: this.createAccountForms.get('password')!.value
    }

    console.log(user);


    this.userService.createUser(user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
