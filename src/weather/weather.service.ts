import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import OpenAI from "openai";
import { User } from "../user/user.model";

@Injectable()
export class WeatherService {
  private readonly API_URL = "https://api.openweathermap.org/data/2.5/weather";
  private readonly API_KEY = process.env.WEATHER_API_KEY;
  private readonly openai: OpenAI;

  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @InjectModel(User) private readonly userModel: typeof User
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getWeatherForUser(userId: number): Promise<any> {
    const user = await this.userModel.findByPk(userId);
    if (!user || !user.location) {
      throw new NotFoundException(
        "Пользователь не найден или не указана локация"
      );
    }

    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.API_URL}`, {
          params: {
            q: user.location,
            units: "metric",
            appid: this.API_KEY,
          },
        })
      );
      return response.data;
    } catch (error) {
      throw new NotFoundException("Не удалось получить данные о погоде");
    }
  }

  async getCareRecommendations(userId: number): Promise<string> {
    const weather = await this.getWeatherForUser(userId);
    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const condition = weather.weather[0]?.description || "неизвестные условия";

    const prompt = `
      Ты эксперт по микрозелени. Дай рекомендации по уходу за микрозеленью на основе текущих погодных условий:
      - Температура: ${temp}°C
      - Влажность: ${humidity}%
      - Погодные условия: ${condition}

      Используй лаконичные советы, например:
      - "🔥 Высокая температура! Поставьте микрозелень в тень."
      - "💦 Высокая влажность! Полив не требуется."
      - "✅ Погода оптимальна для роста."
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Ты — бот-агроном." },
          { role: "user", content: prompt },
        ],
      });

      return (
        response.choices[0].message?.content || "Ошибка получения рекомендации."
      );
    } catch (error) {
      console.error("Ошибка AI:", error);
      throw new Error("Не удалось получить рекомендацию от AI");
    }
  }
}
