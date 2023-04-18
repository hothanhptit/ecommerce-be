import { ProductInfo } from './product-info.entity';
import { RelatedProduct } from './relatedProduct.entity';
export declare class Product {
    id: string;
    name: string;
    slug: string;
    status: number;
    images: string;
    imagesCompress: string;
    summary?: string;
    isFeatured?: number;
    price?: string;
    description?: string;
    descriptionImages?: string;
    specs?: string;
    specsImages?: string;
    detailsDescription?: string;
    categoryId?: string;
    type?: string;
    related: RelatedProduct[];
    info: ProductInfo;
    createdAt: string;
    updatedAt: string;
}
