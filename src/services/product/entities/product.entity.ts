import { ProductInfo } from './product-info.entity';
import { RelatedProduct } from './relatedProduct.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@Index('prod_id', ['id'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column('int', { nullable: true, default: 1 })
  status: number;

  @Column()
  images: string;

  @Column()
  summary?: string;

  @Column('tinyint', { nullable: true })
  isFeatured?: number;

  @Column()
  price?: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  descriptionImages?: string;
  // pdf file

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

  @OneToOne(() => ProductInfo)
  @JoinColumn()
  info: ProductInfo;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
