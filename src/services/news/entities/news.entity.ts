import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  image_path: string;
  @Column()
  title: string;
  @Column()
  category: string;
  @Column()
  tags: string;
  @Column()
  content: string;
  @CreateDateColumn()
  created_at: String;
  @UpdateDateColumn()
  updated_at: String;
}
