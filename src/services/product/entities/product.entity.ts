import { RelatedProduct } from './relatedProduct.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index('prod_id', ['id'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string;

  @Column('int', { nullable: true, default: 1 })
  status: number;

  @Column()
  productImages: string;

  @Column()
  summary?: string;

  @Column()
  price?: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  descriptionImages?: string;
  // pdf file
  @Column()
  catalogue?: string;

  @Column()
  specs?: string;

  @Column({ nullable: true })
  specsImages?: string;

  @Column()
  detailsDescription?: string;

  @Column()
  categoryId?: string;

  @Column()
  type?: string;

  // @Column({ nullable: true })
  @OneToMany(() => RelatedProduct, (related) => related.product)
  related: RelatedProduct[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
