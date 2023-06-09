import { RelatedProduct } from './relatedProduct.entity';
export declare class Product {
    id: string;
    name: string;
    slug: string;
    status: number;
    productImages: string;
    summary?: string;
    price?: string;
    description?: string;
    descriptionImages?: string;
    catalogue?: string;
    specs?: string;
    specsImages?: string;
    detailsDescription?: string;
    categoryId?: string;
    type?: string;
    related: RelatedProduct[];
    createdAt: string;
    updatedAt: string;
}
