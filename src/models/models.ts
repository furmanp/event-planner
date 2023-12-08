export interface User {
  id?: number;
  username: string;
  password: string;
}

export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  company_id: number;
}

export interface Client {
  id?: number;
  company_id: number;
  name: string;
}

export interface Inventory {
  id?: number;
  company_id: number;
  name: string;
  stock: number;
}

export interface PrismaError {
  code?: string;
  message: string;
}

export interface ProjectList {
  id?: number;
  name: string;
  date: Date;
}

export interface Project extends ProjectList {
  client_id: number;
  company_id: number;
}

export interface Equipment {
  id?: number;
  project_id: number;
  company_id: number;
  item_id: number;
  check_in: Date;
  check_out: Date;
}

export interface Company {
  id?: number;
  name: string;
  user_id: number;
}
export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {
  page: string; //offset
  pageSize: string; // limit
  sortBy?: string;
  filterBy?: string;
}
