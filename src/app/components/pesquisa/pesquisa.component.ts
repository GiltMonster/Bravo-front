import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonList, IonItem, IonSelect, IonSelectOption, IonInfiniteScroll, IonInfiniteScrollContent, IonContent, IonChip, IonButton, IonInput } from "@ionic/angular/standalone";
import Categorie from 'src/app/interfaces/Categories';
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

  categories: Categorie[] = [
    {
      id: '1',
      name: 'Categoria 1',
      description: 'Descrição da categoria 1',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Categoria 2',
      description: 'Descrição da categoria 2',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Categoria 3',
      description: 'Descrição da categoria 3',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      name: 'Categoria 4',
      description: 'Descrição da categoria 4',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      name: 'Categoria 5',
      description: 'Descrição da categoria 5',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '6',
      name: 'Categoria 6',
      description: 'Descrição da categoria 6',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '7',
      name: 'Categoria 7',
      description: 'Descrição da categoria 7',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '8',
      name: 'Categoria 8',
      description: 'Descrição da categoria 8',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '9',
      name: 'Categoria 9',
      description: 'Descrição da categoria 9',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '10',
      name: 'Categoria 10',
      description: 'Descrição da categoria 10',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '11',
      name: 'Categoria 11',
      description: 'Descrição da categoria 11',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '12',
      name: 'Categoria 12',
      description: 'Descrição da categoria 12',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '13',
      name: 'Categoria 13',
      description: 'Descrição da categoria 13',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '14',
      name: 'Categoria 14',
      description: 'Descrição da categoria 14',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '15',
      name: 'Categoria 15',
      description: 'Descrição da categoria 15',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '16',
      name: 'Categoria 16',
      description: 'Descrição da categoria 16',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '17',
      name: 'Categoria 17',
      description: 'Descrição da categoria 17',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '18',
      name: 'Categoria 18',
      description: 'Descrição da categoria 18',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '19',
      name: 'Categoria 19',
      description: 'Descrição da categoria 19',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '20',
      name: 'Categoria 20',
      description: 'Descrição da categoria 20',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '21',
      name: 'Categoria 21',
      description: 'Descrição da categoria 21',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '22',
      name: 'Categoria 22',
      description: 'Descrição da categoria 22',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '23',
      name: 'Categoria 23',
      description: 'Descrição da categoria 23',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '24',
      name: 'Categoria 24',
      description: 'Descrição da categoria 24',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '25',
      name: 'Categoria 25',
      description: 'Descrição da categoria 25',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '26',
      name: 'Categoria 26',
      description: 'Descrição da categoria 26',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '27',
      name: 'Categoria 27',
      description: 'Descrição da categoria 27',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '28',
      name: 'Categoria 28',
      description: 'Descrição da categoria 28',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '29',
      name: 'Categoria 29',
      description: 'Descrição da categoria 29',
      active: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '30',
      name: 'Categoria 30',
      description: 'Descrição da categoria 30',
      active: true,
      image: 'https://via.placeholder.com/150',
    }

  ];

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
    if (this.categoriesSelected.length === 0) this.updateCategory();

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

  updateCategory() {
    this.btnUpdate = false;
    throw new Error('Method not implemented.');
  }



}
