import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-desc-produto',
  templateUrl: './desc-produto.component.html',
  styleUrls: ['./desc-produto.component.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class DescProdutoComponent {


  constructor() { }

}
