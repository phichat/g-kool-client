
export interface RoleShortResponse {
  id: string;
  code: string;
  name: string;
}

export interface RoleRequest {
  code: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface RoleResponse extends RoleRequest {
  id: string;
  createBy: string;
  updateBy: string;
  created: string;
  updated: string;
}
