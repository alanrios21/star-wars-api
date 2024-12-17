import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'int', nullable: false })
  episode_id: number;

  @Column({ type: 'text', nullable: false })
  opening_crawl: string;

  @Column({ nullable: false })
  director: string;

  @Column({ nullable: false })
  producer: string;

  @Column({ type: 'date', nullable: false })
  release_date: string; 

  @Column({ default: false })
  isDeleted: boolean;
  
}
