import { handlePrismaError } from '../libs/prisma.js';
import { getEquipmentByDate } from '../services/equipment.service.js';
import { getInventoryById } from '../services/inventory.service.js';
import { DateError } from './errors.js';
import { Equipment as IEquipment } from './models.js';
import { Inventory as IInventory } from './models.js';
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

  async isAvailable(projectDate: Date): Promise<boolean> {
    const formatedDate = new Date(projectDate);
    if (formatedDate >= this.check_in && formatedDate <= this.check_out) {
      try {
        const reservations: IEquipment[] = (
          await getEquipmentByDate(projectDate)
        ).filter((item) => item.item_id == this.item_id);

        const item: IInventory | null = await getInventoryById(this.item_id);
        if (reservations.length < (item?.stock || 0)) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw handlePrismaError(error);
      }
    } else {
      throw new DateError({
        name: 'Equipment Booking Error',
        message: 'Check booking dates with project date.',
      });
    }
  }
}
