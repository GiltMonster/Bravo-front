import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonSelect, IonSelectOption, IonChip, IonInput, IonButton, IonIcon } from "@ionic/angular/standalone";
import Category from 'src/app/interfaces/Category';
import { ProdutoService } from 'src/app/services/home/produto.service';
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss'],
  imports: [IonButton, IonInput, IonChip, IonSelect, IonSelectOption, FormsModule],
  standalone: true,
})
export class PesquisaComponent {

  isMobile: boolean = this.platformService.isMobile();
  btnUpdate: boolean = false;
  styleSearchbarContainer: string = "searchbar-content";

  isFocused: boolean = false;

  txtSearch: string = '';

  @Input() categories: Category[] = [];
  @Input() isLoaded: boolean = false;
  @Output() namesCategorys: EventEmitter<string[]> = new EventEmitter();
  @Output() searchedProducts: EventEmitter<Category[]> = new EventEmitter();

  @Output() cancelar: EventEmitter<any> = new EventEmitter();


  categoriesSelected: string[] = [];

  constructor(
    private platformService: PlatformService,
    private productService: ProdutoService
  ) {

    if (this.isMobile) {
      this.styleSearchbarContainer = 'searchbar-content-mobile';
    }
  }

  handleFocus() {
    this.isFocused = true;
  }

  handleClear() {
    this.txtSearch = '';
    this.isFocused = false;
    this.cancelar.emit();
  }

  handleInput(event: any) {
    this.productService.getProductsByNames(event.target.value).subscribe((data) => {
      this.searchedProducts.emit(data);
    });
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
    this.namesCategorys.emit(categoriName);
  }



}
