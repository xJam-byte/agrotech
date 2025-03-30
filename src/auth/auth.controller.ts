import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dto/create.user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() customerDto: CreateUserDto) {
    return this.authService.login(customerDto);
  }

  @Post("/registration")
  async registration(@Body() customerDto: CreateUserDto) {
    return this.authService.registration(customerDto);
  }
}
