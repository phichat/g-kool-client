import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenModel, ITokenService } from '@delon/auth';
import { environment } from '@env/environment';
import { AuthenticateResponse } from '@models';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.api.baseUrl}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenSrv: ITokenService) { }

  private get token(): { id: string; roleId: string; exp: number } {
    const token = this.tokenSrv.get()?.token as string;
    const jwtToken = JSON.parse(atob(token.split('.')[1]));
    return jwtToken;
  }
  public get userId(): string {
    return this.token.id;
  }
  public get roleId(): string {
    return this.token.roleId;
  }

  login(value: { username: string; password: string; isPersistent: boolean }) {
    return this.http.post<AuthenticateResponse>(`${baseUrl}/authenticate`, value).pipe(map(o => this.mapToken(o)));
  }

  logout() {
    this.http.post<any>(`${baseUrl}/revoke-token`, {}).subscribe();
    this.tokenSrv.clear();
    this.router.navigate(['/account/login']);
  }
  refreshToken() {
    return this.http.post<AuthenticateResponse>(`${baseUrl}/refresh-token`, {}).pipe(map(o => this.mapToken(o)));
  }
  verifyEmail(token: string) {
    return this.http.post(`${baseUrl}/verify-email`, { token });
  }
  forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email });
  }
  resetPassword(value: { token: string; password: string; confirmPassword: string }) {
    return this.http.post(`${baseUrl}/reset-password`, { ...value });
  }
  changePassword(value: { password: string; confirmPassword: string }) {
    return this.http.post(`${baseUrl}/change-password`, { userId: this.userId, ...value });
  }

  private mapToken(o: AuthenticateResponse) {
    const jwtToken = JSON.parse(atob(o.token.split('.')[1]));
    const tokenModel = {
      token: o.token,
      name: `${o.firstName}.${o.lastName.substring(0, 0)}`,
      email: o.email,
      time: +new Date(),
      expired: +new Date(jwtToken.exp * 1000)
    } as ITokenModel;
    this.tokenSrv.set(tokenModel);
    return tokenModel;
  }
}
