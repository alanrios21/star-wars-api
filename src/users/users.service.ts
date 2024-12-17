import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./entities/users.entity";
import * as bcryptjs from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userRepository.find({
      where: { isDeleted: false },
      order: { id: "ASC" },
    });
  }

  async findOne(id: string): Promise<Users> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = await this.findOneByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async update(id: string, user: Partial<Users>): Promise<Users> {
    if (Object.keys(user).length === 0) {
      throw new Error("No update values provided");
    }

    await this.userRepository.update(id, user);

    return this.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.update(id, { isDeleted: true });
  }

  async restore(id: number): Promise<void> {
    await this.userRepository.update(id, { isDeleted: false });
  }

  async findOneByEmail(email: string): Promise<Users> {
    return this.userRepository.findOneBy({ email });
  }

  async findByEmailWithPassword(email: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { email },
      select: ["id", "username", "email", "password", "role"],
    });
  }
}
