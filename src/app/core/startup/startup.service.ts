import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { ACLService } from '@delon/acl';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { environment } from '@env/environment';
import { UserService } from '@service';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { Observable, zip, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../i18n/i18n.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private userSrv: UserService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(): Observable<void> {
    const language = this.httpClient.get(`${environment.api.clientUrl}/assets/tmp/i18n/${this.i18n.defaultLang}.json`);
    const defaultLang = this.i18n.defaultLang;
    return zip(language, this.userSrv.userMenu()).pipe(
      catchError((res: NzSafeAny) => {
        console.warn(`StartupService.load: Network request failed`, res);
        return [] as any[];
      }),
      map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
        // setting language data
        this.i18n.use(defaultLang, langData);

        // Application data
        // Application information: including site name, description, year
        this.settingService.setApp(appData.app);
        // User information: including name, avatar, email address
        this.settingService.setUser(appData.user);
        // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
        this.aclService.setFull(true);
        // Menu data, https://ng-alain.com/theme/menu
        this.menuService.add(appData.menu);
        // Can be set page suffix title, https://ng-alain.com/theme/title
        this.titleService.suffix = appData.app.name;
      })
    );
  }

  load(): Observable<void> {
    return this.viaHttp();
  }
}
