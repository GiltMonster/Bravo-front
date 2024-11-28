import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCheckbox, IonToast, IonSkeletonText, IonIcon, IonInput, IonItemDivider, IonItemGroup, IonRadioGroup, IonRadio, IonItemOptions, IonItemOption, IonItemSliding, IonAccordionGroup, IonAccordion, IonNote, IonProgressBar } from '@ionic/angular/standalone';
import { PlatformService } from 'src/app/services/platform.service';
import { CarrinhoService } from 'src/app/services/produto/carrinho.service';
import { AuthLoginService } from 'src/app/services/auth/auth-login.service';
import Item_carrinho from 'src/app/interfaces/Item_carrinho';
import { User } from 'src/app/interfaces/User';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { Router } from '@angular/router';
import Message from 'src/app/interfaces/Message';
import { addIcons } from 'ionicons';
import { closeCircle, fileTray, pencil, save, trash } from 'ionicons/icons';
import Endereco from 'src/app/interfaces/Endereco';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { FormatCEPPipe } from 'src/app/pipes/format-cep.pipe';
import { PedidoService } from 'src/app/services/produto/pedido.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonNote, IonAccordion, IonAccordionGroup, IonItemSliding, IonItemOption, IonItemOptions, IonRadio, IonRadioGroup, IonItemGroup, IonItemDivider, IonInput, IonIcon, IonSkeletonText, IonToast, IonCheckbox,
    IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FormatPricePipe, FormatCEPPipe
  ]
})

export class CarrinhoPage implements OnInit {

  allSelected: boolean = false;
  isMobile = this.platformService.isMobile();
  isLoaded: boolean = false;
  editMode: boolean = false;
  idProdutoEdit: number = 0;

  anyEnderecoChecked: boolean = true;

  trilha = ['endereco', 'itensCarrinho', 'finalizarCompra'];
  trilhaIndex = 0;

  msg: Message = { message: '', usuario: '' };
  isToastOpen: boolean = false;
  isError: boolean = false;

  enderecos: Endereco[] = [];
  idEnderecoSelecionado: string = '';

  itensCarrinho: Item_carrinho[] = [];
  usuario: User = {
    name: '',
    cpf: '',
    email: '',
    password: ''
  }

  constructor(
    private platformService: PlatformService,
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private authService: AuthLoginService,
    private enderecoService: EnderecoService,
    private router: Router
  ) {
    addIcons({ save, closeCircle, fileTray, trash, pencil });
  }

  ngOnInit(): void {
    this.ionViewWillEnter();
  }

  ionViewWillEnter(): void {
    this.authService.verifyToken().subscribe(
      (response) => {
        this.getItensCarrinho(response.id!);
        this.getEnderecos(response.id!);
        this.usuario = response;
      },
      (error) => {
        this.isMobile ? this.router.navigate(['/mobile/tabs/login']) : this.router.navigate(['/login']);
      }
    );
  }

  toggleTrilha(index: number) {
    this.trilhaIndex = index;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  goto(id_produto: number) {
    this.isMobile ? this.router.navigate(['/mobile/tabs/page/produto/', id_produto]) : this.router.navigate(['/desc/produto/', id_produto]);

  }

  goToEndereco() {
    this.router.navigate(['/mobile/tabs/page/enderecos']);
  }

  removerItem(produto_id: number, needMessage: boolean = true) {
    this.carrinhoService.removeItemCarrinho(produto_id, this.usuario.id!).subscribe((response) => {
      if (needMessage) {
        this.msg = response;
        this.setOpen(true);
        this.isError = false;
      }
      if (this.itensCarrinho.length === 1) {
        this.itensCarrinho = [];
        this.getItensCarrinho(this.usuario.id!);
      }
      this.getItensCarrinho(this.usuario.id!);
    }, (error) => {
      this.msg = error.error
      this.isError = true;
      this.setOpen(true);
    });
  }

  finalizarCompra() {
    if (this.idEnderecoSelecionado === '') {
      this.msg = { message: 'Selecione um endereço!!', usuario: '' };
      this.isError = true;
      this.setOpen(true);
      return;
    }

    let produtos_ids_qtd: { [key: string]: number } = {};
    this.itensCarrinho.forEach((item) => {
      if (item.selecionado) {
        produtos_ids_qtd[item.id_produto] = parseInt(item.quantidade);
      }
    });

    if (Object.keys(produtos_ids_qtd).length === 0) {
      this.msg = { message: 'Selecione ao menos um item para finalizar a compra!!', usuario: '' };
      this.isError = true;
      this.setOpen(true);
      return;
    }

    let compra = {
      "usario_id": this.usuario.id!,
      "endereco_id": this.idEnderecoSelecionado,
      "produtos_ids_qtd": produtos_ids_qtd
    }

    this.pedidoService.finalizarPedido(compra).subscribe((response) => {
      this.msg = response;
      this.setOpen(true);
      this.isError = false;
      this.itensCarrinho.forEach((item) => {
        if (item.selecionado) {
          this.removerItem(item.id_produto, false);
        }
      });
      this.getItensCarrinho(this.usuario.id!);
    }, (error) => {
      this.msg = error.error
      this.isError = true;
      this.setOpen(true);
    });
  }

  getItensCarrinho(id_user: string) {
    this.isLoaded = true;
    this.carrinhoService.listaCarrinho(id_user).subscribe((response) => {
      this.itensCarrinho = response;
      this.isLoaded = false;
    }, (error) => {
      this.isLoaded = false;
      this.msg = error.error
      this.isError = true;
      this.setOpen(true);
    });
  }

  getEnderecos(id_user: string) {
    this.isLoaded = true;
    this.enderecoService.getListEndereco(id_user).subscribe((response) => {
      this.enderecos = response;
      this.isLoaded = false;
    }, (error) => {
      this.isLoaded = false;
      this.msg = error.error
      this.isError = true;
      this.setOpen(true);
    });
  }

  getTotal() {
    let total = 0;
    this.itensCarrinho.forEach((item) => {
      total += parseFloat(item.preco) * parseFloat(item.quantidade);
    });
    return total;
  }

  getTotalUnidade(item: Item_carrinho): string {
    return ((parseFloat(item.preco) * parseFloat(item.quantidade)) - Number(item.desconto)).toFixed(2);
  }

  toggleMode(id_produto: number) {
    this.editMode = !this.editMode;
    this.idProdutoEdit = id_produto;
  }

  selecionarTodos() {
    this.allSelected = !this.allSelected;
    this.itensCarrinho.forEach((item) => {
      if (this.allSelected) {
        item.selecionado = true;
      } else {
        item.selecionado = false;
      }

    })

  }

  handleChange(ev: any) {
    this.idEnderecoSelecionado = ev.target.value;
    this.anyEnderecoChecked = false;
    this.toggleTrilha(1);

  }

  saveStock(newStock: string, item: Item_carrinho) {
    this.editMode = !this.editMode;

    if (parseInt(newStock) < 1) {
      this.msg = { message: 'Quantidade inválida', usuario: '' };
      this.isError = true;
      this.setOpen(true);
      return;
    }


    this.carrinhoService.editCartItem(item.id_produto, parseInt(newStock), this.usuario.id!).subscribe((response) => {
      this.msg = response;
      this.setOpen(true);
      this.isError = false;
      this.getItensCarrinho(this.usuario.id!);
    }, (error) => {
      this.msg = error.error
      this.isError = true;
      this.setOpen(true);
    })

    this.getTotalUnidade(item);

  }

}
