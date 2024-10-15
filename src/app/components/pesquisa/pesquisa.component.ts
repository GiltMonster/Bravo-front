import { Component, Input, Output,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonList, IonItem, IonSelect, IonSelectOption, IonInfiniteScroll, IonInfiniteScrollContent, IonContent, IonChip, IonButton, IonInput } from "@ionic/angular/standalone";
import Category from 'src/app/interfaces/Category';
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss'],
  imports: [IonInput, IonButton, IonChip, IonContent, IonInfiniteScrollContent, IonInfiniteScroll, IonItem, IonList, IonSearchbar, IonSelect, IonSelectOption, FormsModule],
  standalone: true,
})
export class PesquisaComponent {

  isMobile: boolean;
  btnUpdate: boolean = false;
  styleSearchbarContainer: string = "searchbar-content";

  @Input() categories: Category[] = [];
  @Input() isLoaded: boolean = false;

  categoriesSelected: string[] = [];

  constructor(
    platformService: PlatformService
  ) {
    this.isMobile = platformService.isMobile();
    if (this.isMobile) {
      this.styleSearchbarContainer = 'searchbar-content-mobile';
    }
  }

  removeCategory(categorie: string) {
    this.categoriesSelected = this.categoriesSelected.filter(category => category !== categorie);
    this.btnUpdate = true;
    if (this.categoriesSelected.length === 0) this.updateCategory(this.categoriesSelected);

  }

  handleChange({ value }: any) {
      this.categoriesSelected = value; // Atualiza a lista de categorias selecionadas
      this.btnUpdate = true;

  }

  selectCategory(categorie: string) {
    if (this.categoriesSelected.includes(categorie)) {
      console.log(categorie + ' já está selecionado');
    } else {
      this.categoriesSelected.push(categorie);
      this.btnUpdate = true;
    }
  }

  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }

  updateCategory(categoriName: string[]) {
    this.btnUpdate = false;
    throw new Error('Method not implemented.');
  }



}
