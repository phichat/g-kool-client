import { MenuResponse } from "./menu";
import { RoleResponse } from "./role";


export interface RoleShortResponse {
  id: string;
  roleId: string;
  menuId: string;
}

export interface RoleMenuRequest {
  roleId: string;
  menuId: string;
  isActive: boolean;
}

export interface RoleMenuResponse extends RoleMenuRequest {
  id: string;
  role: RoleResponse;
  menu: MenuResponse;
}

export interface UserMenuResponse {
  app: App;
  user: User;
  menu: Menu[];
}

export interface App {
  name: string;
  description: string;
}

export interface User {
  name: string;
  avatar: string;
  email: string;
}

export interface Menu {
  text: string;
  i18n: string;
  group: boolean;
  hideInBreadcrumb: boolean;
  icon: string;
  link: string;
  children: Menu[];
}
