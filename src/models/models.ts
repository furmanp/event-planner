export interface User {
  id?: number;
  username: string;
  password: string;
}

export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  user_id: number;
}

export interface Client {
  id?: number;
  user_id: number;
  name: string;
}

export interface Inventory {
  id?: number;
  user_id: number;
  name: string;
  stock: number;
}

export interface PrismaError {
  code?: number;
  message: string;
}

export interface ProjectList {
  id?: number;
  name: string;
  date: Date;
}

export interface Project extends ProjectList {
  client_id: number;
  project_owner_id: number;
}

export interface Equipment {
  id?: number;
  project_id: number;
  item_id: number;
  check_in: Date;
  check_out: Date;
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
