import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  image: string;
  @Column({ nullable: true })
  children: string;
  @Column({ nullable: true })
  parent: number;
  // @OneToMany(() => Category, category => category.id)
  // @JoinColumn()
  // parent: Category[];
  @Column()
  status: number;
  @Column()
  description: string;
  @CreateDateColumn()
  created_at: String;
  @UpdateDateColumn()
  updated_at: String;
}
