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
  @Column({ nullable: true })
  slug: string;
  @Column()
  image: string;
  @Column()
  title: string;
  @Column()
  category: string;
  @Column({ nullable: true })
  categoryName: string;
  @Column({ nullable: true })
  created_by: string;
  @Column()
  tags: string;
  @Column()
  content: string;
  @CreateDateColumn()
  created_at: string;
  @UpdateDateColumn()
  updated_at: string;
}
