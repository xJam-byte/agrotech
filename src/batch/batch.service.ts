import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Batch } from "./batch.mdel";
import { CreateBatchDto } from "./dto/create.batch.dto";
@Injectable()
export class BatchService {
  constructor(@InjectModel(Batch) private batchModel: typeof Batch) {}

  async createBatch(dto: CreateBatchDto): Promise<Batch> {
    const expectedHarvestDate = await this.predictHarvestDate(
      dto.type,
      dto.sowing_date
    );
    return this.batchModel.create({
      ...dto,
      expected_harvest_date: expectedHarvestDate,
    });
  }

  async getAllBatches(): Promise<Batch[]> {
    return this.batchModel.findAll();
  }

  async getBatchById(id: number): Promise<Batch | null> {
    return this.batchModel.findByPk(id);
  }

  async updateBatch(
    id: number,
    updateData: Partial<Batch>
  ): Promise<[number, Batch[]]> {
    return this.batchModel.update(updateData, {
      where: { batch_id: id },
      returning: true,
    });
  }

  async deleteBatch(id: number): Promise<number> {
    return this.batchModel.destroy({ where: { batch_id: id } });
  }

  private async predictHarvestDate(
    type: string,
    sowingDate: Date
  ): Promise<Date> {
    const daysToHarvest = await this.getOptimalHarvestDays(type);
    const harvestDate = new Date(sowingDate);
    harvestDate.setDate(harvestDate.getDate() + daysToHarvest);
    return harvestDate;
  }

  private async getOptimalHarvestDays(type: string): Promise<number> {
    const defaultHarvestDays = { Sunflower: 10, "Pea Shoots": 12, Radish: 8 };
    return defaultHarvestDays[type] || 10;
  }
}
