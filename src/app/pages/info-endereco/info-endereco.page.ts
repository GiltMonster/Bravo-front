import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonLabel, IonIcon, IonButton, IonToast, IonInput, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonItemDivider, IonAccordion, IonAccordionGroup } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeCircle, home, location, map, save } from 'ionicons/icons';
import { User } from 'src/app/interfaces/User';
import Message from 'src/app/interfaces/Message';
import Endereco from 'src/app/interfaces/Endereco';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { EnderecoCardComponent } from "../../components/endereco-card/endereco-card.component";

@Component({
  selector: 'app-info-endereco',
  templateUrl: './info-endereco.page.html',
  styleUrls: ['./info-endereco.page.scss'],
  standalone: true,
  imports: [IonAccordionGroup, IonAccordion, IonItemDivider, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonInput, IonToast, IonButton, IonIcon, IonLabel, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, EnderecoCardComponent]
})
export class InfoEnderecoPage implements OnInit {

  userAuthenticated: User = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: ''
  };

  listEndereco: Endereco[] = [];

  isMobile: boolean = this.platformService.isMobile();
  msg: Message = { message: '', usuario: '' };
  isToastOpen: boolean = false;
  isError: boolean = false;
  isDisable: boolean = true;

  protected registerAddressForms = this.formBuilder.group({
    nomeEndereco: this.formBuilder.control('', { validators: [Validators.required] }),
    cep: this.formBuilder.control('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    cidade: this.formBuilder.control('', [Validators.required]),
    estado: this.formBuilder.control('', [Validators.required]),
    numero: this.formBuilder.control('', [Validators.required]),
    logradouro: this.formBuilder.control('', [Validators.required]),
    complemento: this.formBuilder.control('')
  });

  constructor(
    private platformService: PlatformService,
    private authService: AuthLoginService,
    private router: Router,
    protected formBuilder: NonNullableFormBuilder,
    private enderecoService: EnderecoService

  ) {
    addIcons({ location, map, home, save, closeCircle })
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe(
      (response) => {
        this.userAuthenticated = response;
        console.log(this.userAuthenticated.name);
        this.getListEndereco(response.id!);
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }

  applyCepMask(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{5})(\d{1,3})$/, '$1-$2'); // Coloca o hífen
    this.registerAddressForms.get('cep')!.setValue(value);
  }

  removeCepMask(cep: string): string {
    return cep.replace(/\D/g, '');
  }

  searchCep() {
    const cep = this.registerAddressForms.get('cep')!.value;
    this.enderecoService.getEndereco(cep).subscribe(
      (response: Endereco) => {
        this.registerAddressForms.get('cidade')!.setValue(response.localidade ? response.localidade : response.cidade);
        this.registerAddressForms.get('estado')!.setValue(response.uf!);
        this.registerAddressForms.get('logradouro')!.setValue(response.logradouro);
        this.registerAddressForms.get('complemento')!.setValue(response.complemento ? response.complemento : '');

        console.log(response);
        if (response.erro) {
          this.msg.message = 'CEP inválido';
          this.isError = true;
          this.isToastOpen = true;
        }
      },
      (error) => {
        console.log(error);
        if (error) {
          this.msg.message = 'CEP inválido';
          this.isError = true;
          this.isToastOpen = true;
        }
      }
    );
  }

  saveAddress() {
    this.isDisable = false;

    let endereco: Endereco = {
      nome: this.registerAddressForms.value.nomeEndereco!,
      cep: this.removeCepMask(this.registerAddressForms.value.cep!),
      cidade: this.registerAddressForms.value.cidade!,
      estado: this.registerAddressForms.value.estado!,
      numero: this.registerAddressForms.value.numero,
      logradouro: this.registerAddressForms.value.logradouro!,
      complemento: this.registerAddressForms.value.complemento,
      usuario_id: this.userAuthenticated.id
    }

    this.enderecoService.saveEndereco(endereco).subscribe(
      (response) => {
        this.getListEndereco(this.userAuthenticated.id!);
        this.registerAddressForms.reset();
        this.setOpen(true);
        this.msg.message = response.message;
        this.isError = false;
        this.msg.message = response.message;
        this.isDisable= true;
      },
      (error) => {
        console.log(error);
        this.isError = true;
        this.setOpen(true);
        this.msg.message = error.error.message;
        this.isDisable= true;
      }
    );
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;

  }

  getListEndereco(id: string) {
    this.enderecoService.getListEndereco(id).subscribe(
      (response) => {
        this.listEndereco = response;

      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEnderecoById(id: string) {
    console.log(id);

    this.enderecoService.deleteEndereco(id).subscribe(
      (response) => {
        this.setOpen(true);
        this.isError = false;
        this.msg.message = response.message;
        this.getListEndereco(this.userAuthenticated.id!);
      },
      (error) => {
        this.isError = true;
        this.setOpen(true);
        this.msg.message = error.error.message;
        this.isDisable= true;

      }
    );
  }


}
