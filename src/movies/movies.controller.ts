import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movies.entity";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Role } from "src/enum/role.enum";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Auth(Role.user)
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Auth(Role.admin)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }
  @Auth(Role.admin)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateMovieDto: UpdateMovieDto
  ): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Auth(Role.admin)
  @Delete(":id")
  async softDelete(@Param("id") id: number): Promise<void> {
    return this.moviesService.softDelete(id);
  }

  @Auth(Role.admin)
  @Patch("restore/:id")
  async restore(@Param("id") id: number): Promise<void> {
    return this.moviesService.restore(id);
  }
}
