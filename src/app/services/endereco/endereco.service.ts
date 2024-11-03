import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Endereco from 'src/app/interfaces/Endereco';
import Message from 'src/app/interfaces/Message';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private http: HttpClient
  ) { }

  getEndereco(cep: string) {
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getListEndereco(user_id: string) {
    return this.http.get<Endereco[]>(`${environment.API_URL_ENDERECO}/${user_id}`);
  }

  saveEndereco(endereco: Endereco){
    return this.http.post<Message>(`${environment.API_URL_ENDERECO}`, endereco);
  }

  updateEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${environment.API_URL_ENDERECO}/${endereco.id}`, endereco);
  }

  deleteEndereco(id: string){
    return this.http.delete<Message>(`${environment.API_URL_ENDERECO}/${id}`);
  }

}
