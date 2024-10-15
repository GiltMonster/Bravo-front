import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Category from 'src/app/interfaces/Category';
import Product from 'src/app/interfaces/Product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }


  getHomeData() {
    return this.http.get<Category[]>(environment.BASE_API_URL);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${environment.API_URL_PRODUCTS}/${id}`);
  }

}
