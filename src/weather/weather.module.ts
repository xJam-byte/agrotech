import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SequelizeModule } from "@nestjs/sequelize";
import { WeatherService } from "./weather.service";
import { WeatherController } from "./weather.controller";
import { User } from "../user/user.model";

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([User])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
