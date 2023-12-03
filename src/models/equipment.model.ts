import { Equipment as IEquipment } from './models.js';

export class Equipment implements IEquipment {
  id?: number;
  project_id: number;
  item_id: number;
  check_in: Date;
  check_out: Date;

  constructor(equipment: IEquipment) {
    this.id = equipment.id;
    this.project_id = equipment.project_id;
    this.item_id = equipment.item_id;
    this.check_in = new Date(equipment.check_in);
    this.check_out = new Date(equipment.check_out);
  }

  isAvailable(projectDate: Date): boolean {
    if (projectDate >= this.check_in && projectDate <= this.check_out) {
      return true;
    } else {
      return false;
    }
  }
}
