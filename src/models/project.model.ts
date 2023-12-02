import { Project as IProject } from './models.js';

export class Project implements IProject {
  id: number;
  name: string;
  date: Date;
  client_id: number;
  project_owner_id: number;

  constructor(
    name: string,
    date: Date,
    client_id: number,
    project_owner_id: number,
  ) {
    this.name = name;
    this.date = date;
    this.client_id = client_id;
    this.project_owner_id = project_owner_id;
  }
}
