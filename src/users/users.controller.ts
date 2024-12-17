import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { Role } from "src/enum/role.enum";
import { Users } from "./entities/users.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth(Role.admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Auth(Role.admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Auth(Role.admin)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMovieDto: UpdateUserDto
  ): Promise<Users> {
    return this.usersService.update(id, updateMovieDto);
  }
  @Auth(Role.admin)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.softDelete(id);
  }
  @Auth(Role.admin)
  @Patch("restore/:id")
  async restore(@Param("id") id: number): Promise<void> {
    return this.usersService.restore(id);
  }
}
