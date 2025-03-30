import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create.user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(createCustomerDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createCustomerDto);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(user_id: number): Promise<User | null> {
    return this.userModel.findByPk(user_id);
  }

  async updateUser(
    user_id: number,
    updateData: Partial<User>
  ): Promise<[number, User[]]> {
    return this.userModel.update(updateData, {
      where: { user_id },
      returning: true,
    });
  }

  async deleteUser(user_id: number): Promise<number> {
    return this.userModel.destroy({ where: { user_id } });
  }
}
