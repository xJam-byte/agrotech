import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BatchService } from "./batch.service";
import { BatchController } from "./batch.controller";
import { Batch } from "./batch.mdel";

@Module({
  imports: [SequelizeModule.forFeature([Batch])],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
