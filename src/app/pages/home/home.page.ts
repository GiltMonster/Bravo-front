import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PlatformService } from 'src/app/services/platform.service';
import { PesquisaComponent } from "../../components/pesquisa/pesquisa.component";
import { CardComponent } from "../../components/card/card.component";
import Category from 'src/app/interfaces/Categories';
import Produto from 'src/app/interfaces/Product';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, HeaderComponent, PesquisaComponent, CardComponent],
})
export class HomePage {

  isMobile: boolean;

  categories: Category[] = [
    {
      id: '1',
      name: 'Categoria 1',
      description: 'Descrição da categoria 1',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '2',
      name: 'Categoria 2',
      description: 'Descrição da categoria 2',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '3',
      name: 'Categoria 3',
      description: 'Descrição da categoria 3',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '4',
      name: 'Categoria 4',
      description: 'Descrição da categoria 4',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '5',
      name: 'Categoria 5',
      description: 'Descrição da categoria 5',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '6',
      name: 'Categoria 6',
      description: 'Descrição da categoria 6',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '7',
      name: 'Categoria 7',
      description: 'Descrição da categoria 7',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '8',
      name: 'Categoria 8',
      description: 'Descrição da categoria 8',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '9',
      name: 'Categoria 9',
      description: 'Descrição da categoria 9',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '10',
      name: 'Categoria 10',
      description: 'Descrição da categoria 10',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '11',
      name: 'Categoria 11',
      description: 'Descrição da categoria 11',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '12',
      name: 'Categoria 12',
      description: 'Descrição da categoria 12',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '13',
      name: 'Categoria 13',
      description: 'Descrição da categoria 13',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '14',
      name: 'Categoria 14',
      description: 'Descrição da categoria 14',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '15',
      name: 'Categoria 15',
      description: 'Descrição da categoria 15',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '16',
      name: 'Categoria 16',
      description: 'Descrição da categoria 16',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '17',
      name: 'Categoria 17',
      description: 'Descrição da categoria 17',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '18',
      name: 'Categoria 18',
      description: 'Descrição da categoria 18',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '19',
      name: 'Categoria 19',
      description: 'Descrição da categoria 19',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '20',
      name: 'Categoria 20',
      description: 'Descrição da categoria 20',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '21',
      name: 'Categoria 21',
      description: 'Descrição da categoria 21',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '22',
      name: 'Categoria 22',
      description: 'Descrição da categoria 22',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '23',
      name: 'Categoria 23',
      description: 'Descrição da categoria 23',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '24',
      name: 'Categoria 24',
      description: 'Descrição da categoria 24',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '25',
      name: 'Categoria 25',
      description: 'Descrição da categoria 25',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '26',
      name: 'Categoria 26',
      description: 'Descrição da categoria 26',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '27',
      name: 'Categoria 27',
      description: 'Descrição da categoria 27',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '28',
      name: 'Categoria 28',
      description: 'Descrição da categoria 28',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '29',
      name: 'Categoria 29',
      description: 'Descrição da categoria 29',
      active: true,
      image: 'https://via.placeholder.com/350',
    },
    {
      id: '30',
      name: 'Categoria 30',
      description: 'Descrição da categoria 30',
      active: true,
      image: 'https://via.placeholder.com/350',
    }

  ];

  produto: Produto[] = [
    {
      id: 1,
      name: 'Produto 1',
      produto_desc: 'Descrição do produto 1',
      price: 100,
      produto_desconto: 10,
      imagem_produto: [
        {
          imagem_id: 1,
          imagem_ordem: 1,
          imagem_url: 'https://via.placeholder.com/350',
        }
      ]
    },
    {
      id: 2,
      name: 'Produto 2',
      produto_desc: 'Descrição do produto 2',
      price: 200,
      produto_desconto: 20,
      imagem_produto: [
        {
          imagem_id: 2,
          imagem_ordem: 2,
          imagem_url: 'https://via.placeholder.com/350',
        }
      ]
    },
    {
      id: 3,
      name: 'Produto 3',
      produto_desc: 'Descrição do produto 3',
      price: 300,
      produto_desconto: 30,
      imagem_produto: [
        {
          imagem_id: 3,
          imagem_ordem: 3,
          imagem_url: 'https://via.placeholder.com/350',
        }
      ]
    },
    {
      id: 4,
      name: 'Produto 4',
      produto_desc: 'Descrição do produto 4',
      price: 400,
      produto_desconto: 40,
      imagem_produto: [
        {
          imagem_id: 4,
          imagem_ordem: 4,
          imagem_url: 'https://via.placeholder.com/350',
        }
      ]
    },
    {
      id: 5,
      name: 'Produto 5',
      produto_desc: 'Descrição do produto 5',
      price: 500,
      produto_desconto: 50,
      imagem_produto: [
        {
          imagem_id: 5,
          imagem_ordem: 5,

          imagem_url: 'https://via.placeholder.com/350',
        }
      ]
    }
  ];


  constructor(
    platformService: PlatformService,
  ) {
    this.isMobile = platformService.isMobile();
  }
}
