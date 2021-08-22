

export interface MenuShortResponse {
  id: string;
  code: string;
  name: string;
  url: string;
  icon: string;
  seq: string;
}

export interface MenuRequest {
  code: string;
  name: string;
  url: string;
  icon: string;
  seq: string;
  parent: string;
  isTitle: boolean;
  isActive: boolean;
}

export interface MenuResponse extends MenuRequest {
  id: string;
  createBy: string;
  updateBy: string;
  created: string;
  updated: string;
}
