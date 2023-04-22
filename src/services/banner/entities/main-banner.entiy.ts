import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MainBanner {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  image: string;
  @CreateDateColumn()
  created_at: String;
  @UpdateDateColumn()
  updated_at: String;
}
