import { ProductsService } from 'src/services/product/products.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../cart.entity';
export declare class CartService {
    private cartRepository;
    private productsService;
    constructor(cartRepository: Repository<CartEntity>, productsService: ProductsService);
    addToCart(productId: number, quantity: number, user: string): Promise<any>;
    getItemsInCard(user: string): Promise<CartEntity[]>;
}
