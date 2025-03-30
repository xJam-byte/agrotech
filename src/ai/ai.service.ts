import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async askAI(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Ты — эксперт по микрозелени." },
          { role: "user", content: prompt },
        ],
      });

      return (
        response.choices[0].message?.content || "Ошибка получения ответа от AI"
      );
    } catch (error) {
      console.error("Ошибка AI:", error);
      throw new Error("Не удалось получить ответ от AI");
    }
  }
}
