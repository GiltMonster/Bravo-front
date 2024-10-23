import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Message from 'src/app/interfaces/Message';
import { User } from 'src/app/interfaces/User';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  user: User = {
    name: '',
    cpf: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<Message>(environment.API_URL_AUTH_LOGIN, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  verifyToken() {
    return this.http.get<User>(environment.API_URL_AUTH_VERIFY);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
