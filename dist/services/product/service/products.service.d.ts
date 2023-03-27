import { ProductEntity } from '../product.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Users } from 'src/services/auth/user.entity';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    getAll(): Promise<ProductEntity[]>;
    create(product: ProductEntity, file: any, user: Users): Promise<ProductEntity>;
    getOne(id: number): Promise<ProductEntity>;
    update(id: number, product: ProductEntity, user: Users): Promise<UpdateResult>;
    delete(id: number, user: Users): Promise<DeleteResult>;
}
