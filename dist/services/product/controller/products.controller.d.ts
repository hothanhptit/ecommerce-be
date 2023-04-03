/// <reference types="multer" />
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductDTO } from '../dto/product.dto';
import { ProductEntity } from '../product.entity';
import { ProductsService } from '../service/products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    GetAll(): Promise<ProductEntity[]>;
    Create(req: any, product: ProductDTO, file: Express.Multer.File): Promise<String>;
    GetOne(id: number): Promise<ProductEntity>;
    Update(id: number, product: ProductEntity, req: any): Promise<UpdateResult>;
    Delete(id: number, req: any): Promise<DeleteResult>;
}
