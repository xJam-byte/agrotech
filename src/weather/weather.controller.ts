import { Controller, Get, Param } from "@nestjs/common";
import { WeatherService } from "./weather.service";

@Controller("weather")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(":userId")
  getWeather(@Param("userId") userId: number) {
    return this.weatherService.getWeatherForUser(userId);
  }

  @Get(":userId/recommendations")
  getRecommendations(@Param("userId") userId: number) {
    return this.weatherService.getCareRecommendations(userId);
  }
}
