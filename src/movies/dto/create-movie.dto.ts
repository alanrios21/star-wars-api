import { IsString, IsNotEmpty, IsNumber, IsDateString } from "class-validator";

export class CreateMovieDto {
 
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  episode_id: number;

  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsDateString() 
  @IsNotEmpty()
  release_date: string; 
}
