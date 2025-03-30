import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "batches" })
export class Batch extends Model<Batch> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  batch_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.DATE, allowNull: false })
  sowing_date: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  substrate: string;

  @Column({ type: DataType.DATE })
  expected_harvest_date: Date;

  @Column({
    type: DataType.ENUM("Growing", "Ready to Harvest"),
    defaultValue: "Growing",
  })
  status: string;
}
