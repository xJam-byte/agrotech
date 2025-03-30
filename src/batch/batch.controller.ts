import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { BatchService } from "./batch.service";
import { CreateBatchDto } from "./dto/create.batch.dto";
import { Batch } from "./batch.mdel";

@Controller("batches")
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  create(@Body() dto: CreateBatchDto): Promise<Batch> {
    return this.batchService.createBatch(dto);
  }

  @Get()
  findAll(): Promise<Batch[]> {
    return this.batchService.getAllBatches();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Batch | null> {
    return this.batchService.getBatchById(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateData: Partial<Batch>) {
    return this.batchService.updateBatch(id, updateData);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.batchService.deleteBatch(id);
  }
}
