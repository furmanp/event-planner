import { Equipment as IEquipment } from './models.js';

export class Equipment implements IEquipment {
  id: number;
  project_id: number;
  item_id: number;
  check_in: Date;
  check_out: Date;

  constructor(
    id: number,
    project_id: number,
    item_id: number,
    check_in: Date,
    check_out: Date,
  ) {
    this.id = id;
    this.project_id = project_id;
    this.item_id = item_id;
    this.check_in = check_in;
    this.check_out = check_out;
  }

  isAvailable(projectDate: Date): boolean {
    if (projectDate >= this.check_in && projectDate <= this.check_out) {
      return true;
    } else {
      return false;
    }
  }
}
