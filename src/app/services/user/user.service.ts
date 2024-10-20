import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Message from 'src/app/interfaces/Message';
import { User } from 'src/app/interfaces/User';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User) {
    return this.http.post<Message>(`${environment.API_URL_USUARIO}`, user);
  }
}
