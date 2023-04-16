import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { User } from 'src/services/auth/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { RelatedProduct } from './entities/relatedProduct.entity';
export declare enum Order {
}
export declare class ProductsService {
    private productRepository;
    private relatedProducts;
    constructor(productRepository: Repository<Product>, relatedProducts: Repository<RelatedProduct>);
    private logging;
    getAll(options: IPaginationOptions, orderBy: string, filter: string): Promise<Pagination<Product>>;
    searchProducts(options: IPaginationOptions, orderBy: string, filter: string): Promise<Pagination<Product>>;
    create(productDTO: ProductDTO, files: any, relatedProduct: string, user: User): Promise<Product & ProductDTO>;
    getOne(productId: string): Promise<Product>;
    update(id: string, productDTO: ProductDTO, relatedProduct: string | null, files: any, user: User): Promise<Product>;
    delete(id: number, user: User): Promise<DeleteResult>;
}
