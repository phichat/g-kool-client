import { Component, Inject, OnInit } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less']
})
export class LayoutPassportComponent implements OnInit {
  links = [
    {
      title: '',
      href: '',
    },
  ];

  year = new Date().getFullYear();
  version = environment.appVersion;

  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) { }

  ngOnInit(): void {
    this.tokenService.clear();
  }
}
