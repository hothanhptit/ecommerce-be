import { Product } from './product.entity';
export declare class RelatedProduct {
    id: string;
    productId?: string;
    name?: string;
    images?: string;
    imagesCompress?: string;
    product: Product;
    createdAt: String;
    updatedAt: String;
}
