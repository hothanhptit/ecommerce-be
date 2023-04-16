/// <reference types="multer" />
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { DeleteResult } from 'typeorm';
import { ProductDTO } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    GetAll(page?: number, limit?: number, orderBy?: string, filter?: string): Promise<Pagination<Product>>;
    Create(req: any, product: ProductDTO, files: {
        productImages?: Express.Multer.File[];
        descriptionImages?: Express.Multer.File[];
        specsImages?: Express.Multer.File[];
        catalogue?: Express.Multer.File[];
    }): Promise<Product & ProductDTO>;
    GetOne(id: any): Promise<Product>;
    Update(id: any, product: ProductDTO, files: {
        productImages?: Express.Multer.File[];
    }, req: any): Promise<Product>;
    Delete(id: number, req: any): Promise<DeleteResult>;
}
