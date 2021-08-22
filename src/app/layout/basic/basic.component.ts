import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService, SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['basic.component.scss']
})
export class LayoutBasicComponent implements OnInit {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-thanasup-imex.png`,
    logoCollapsed: `./assets/logo.svg`
  };
  isCollapsed = false;
  // searchToggleStatus = false;
  // showSettingDrawer = !environment.production;
  get user(): User {
    return this.settings.user;
  }
  year = new Date().getFullYear();
  version = environment.appVersion;
  isXSmall = false;

  constructor(
    public settings: SettingsService,
    public menuSrv: MenuService,
    private router: Router,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      this.isXSmall = result.matches;
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(s => this.underPad());
  }

  onCollapsed() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  private underPad() {
    if (this.isXSmall && !this.settings.layout.collapsed) {
      this.settings.setLayout('collapsed', true);
    }
  }
}
