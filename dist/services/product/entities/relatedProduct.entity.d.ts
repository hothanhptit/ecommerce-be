import { Product } from './product.entity';
export declare class RelatedProduct {
    id: string;
    productId?: string;
    name?: string;
    images?: string;
    product: Product;
    createdAt: String;
    updtedAt: String;
}
