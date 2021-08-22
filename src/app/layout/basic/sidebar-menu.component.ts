import { Component, Input } from '@angular/core';
import { MenuService, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styles: [
    `
      .side-nave-wrap {
        height: calc(100vh - 64px);
        padding-bottom: 130px;
        overflow-y: scroll;
      }
    `
  ]
})
export class SidebarMenuComponent {
  @Input() isCollapsed: boolean = false;
  @Input() isXSmall: boolean = false;

  constructor(public settings: SettingsService, public menuSrv: MenuService) { }
}
