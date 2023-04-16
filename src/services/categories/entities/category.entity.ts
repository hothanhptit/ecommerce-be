import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  image: string;
  @Column()
  status: number;
  @Column()
  description: string;
  @CreateDateColumn()
  created_at: String;
  @UpdateDateColumn()
  updated_at: String;
}
