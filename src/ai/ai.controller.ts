import { Controller, Post, Body } from "@nestjs/common";
import { AiService } from "./ai.service";

@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("ask")
  async ask(@Body("question") question: string) {
    return this.aiService.askAI(question);
  }
}
