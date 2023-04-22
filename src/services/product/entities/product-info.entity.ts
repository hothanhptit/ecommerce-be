import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
@Index('prod_inf_id', ['id'])
export class ProductInfo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  manufacturer?: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  warranty: string;

  @Column({ nullable: true })
  catalogue?: string;

  @Column({ nullable: true })
  rating?: string;
}
