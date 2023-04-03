import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  ManyToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name: string;

  @Column()
  productImages: string;

  @Column()
  summary?: string;

  @Column()
  price?: string;

  @Column()
  description?: string;

  @Column()
  descriptionImages?: string;
  // pdf file
  @Column()
  catalogue?: string;

  @Column()
  specs?: string;

  @Column()
  specsImages?: string;

  @Column()
  detailsDescription?: string;

  @Column()
  categoryId?: string;

  @Column()
  type?: string;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updtedAt: String;
}
