import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { log } from "console";
import { CreateUserDto } from "src/user/dto/create.user.dto";
import { LoginUserDto } from "src/user/dto/login.user.dto";
import { User } from "src/user/user.model";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private customerService: UserService,
    private jwtService: JwtService
  ) {}
  async login(customerDto: LoginUserDto) {
    const customer = await this.validateCustomer(customerDto);
    const tkn = this.generateToken(customer);
    log(tkn);
    return [tkn, customer];
  }

  async registration(customerDto: CreateUserDto) {
    const candidate = await this.customerService.findByEmail(customerDto.email);

    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email уже существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const hash = await bcrypt.hash(customerDto.password, 5);
    const customer = await this.customerService.createUser({
      ...customerDto,
      password: hash,
    });
    const tkn = this.generateToken(customer);
    log(tkn);
    return [tkn, customer];
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.user_id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateCustomer(customerDto: LoginUserDto) {
    const customer = await this.customerService.findByEmail(customerDto.email);
    const password = await bcrypt.compare(
      customerDto.password,
      customer.password
    );

    if (customer && password) {
      return customer;
    }
    throw new UnauthorizedException({ messade: "НЕККОРЕКТНО" });
  }
}
