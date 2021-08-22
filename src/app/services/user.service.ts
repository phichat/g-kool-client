import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { UserMenuResponse } from '@models';

const baseUrl = `${environment.api}/user`;

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) { }
    
    userMenu() {
        return this.http.get<UserMenuResponse>(`${baseUrl}/usermenu`);
    }
}