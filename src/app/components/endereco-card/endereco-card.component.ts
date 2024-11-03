import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonCard, IonButton, IonInput } from "@ionic/angular/standalone";
import Endereco from 'src/app/interfaces/Endereco';
import { FormatCEPPipe } from 'src/app/pipes/format-cep.pipe';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-endereco-card',
  templateUrl: './endereco-card.component.html',
  styleUrls: ['./endereco-card.component.scss'],
  imports: [IonButton, IonCard, IonInput, FormatCEPPipe, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class EnderecoCardComponent {

  @Input() endereco: Endereco = {
    id: '',
    nome: '',
    numero: '',
    cidade: '',
    estado: '',
    cep: '',
    complemento: '',
    logradouro: '',
  };

  @Output() deleteEndereco = new EventEmitter<any>();

  editMode: boolean = false;
  enderecoForm: FormGroup;

  constructor(
    private enderecoService: EnderecoService,
    private fb: FormBuilder
  ) {
    this.enderecoForm = this.fb.group({
      nome: ['', Validators.required],
      numero: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      complemento: [''],
      logradouro: ['', Validators.required]
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.enderecoForm.patchValue(this.endereco);
    }
  }

  saveEndereco() {
    if (this.enderecoForm.valid) {
      const updatedEndereco = { ...this.endereco, ...this.enderecoForm.value };
      this.enderecoService.updateEndereco(updatedEndereco).subscribe(() => {
        this.endereco = updatedEndereco;
        this.toggleEditMode();
      });
    }
  }

  deleteEnderecoById(id: string) {
    this.deleteEndereco.emit(id);
  }

  cancelEdit() {
    this.toggleEditMode();
  }
}
