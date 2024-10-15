import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.post<User>(`${environment.BASE_API_URL}/createUsuario`, user);
  }
}
