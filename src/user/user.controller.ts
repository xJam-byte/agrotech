import { Body, Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private service: UserService) {}

  @Get("/getByEmail")
  getChefByUserId(@Body() info: any) {
    return this.service.findByEmail(info.email);
  }
}
