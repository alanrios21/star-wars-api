import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from "./entities/movies.entity";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private httpService: HttpService
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find({
      where: { isDeleted: false },
      order: { id: "ASC" },
    });
  }

  async restore(id: number): Promise<void> {
    await this.moviesRepository.update(id, { isDeleted: false });
  }

  async findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOne({ where: { id } });
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return this.moviesRepository.save(movie);
  }
  async update(id: number, movie: Partial<Movie>): Promise<Movie> {
    if (Object.keys(movie).length === 0) {
      throw new Error("No update values provided");
    }

    await this.moviesRepository.update(id, movie);

    return this.findOne(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.moviesRepository.update(id, { isDeleted: true });
  }

  async syncMoviesFromAPI(): Promise<string> {
    const url = "https://www.swapi.tech/api/films/";
    const response = await lastValueFrom(this.httpService.get(url));

    const movies = response.data.result;

    for (const movie of movies) {
      const { properties } = movie;

      await this.moviesRepository.save({
        title: properties.title,
        episode_id: properties.episode_id,
        opening_crawl: properties.opening_crawl,
        director: properties.director,
        producer: properties.producer,
        release_date: properties.release_date,
      });
    }

    return "Movies synchronized successfully.";
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.log("Executing scheduled movie synchronization...");
    try {
      await this.syncMoviesFromAPI();
      this.logger.log("Movie synchronization completed successfully.");
    } catch (error) {
      this.logger.error("Failed to synchronize movies:", error.message);
    }
  }
}
