import { CartService } from './../../cart/service/cart.service';
import { OrderEntity } from '../order.entity';
import { Repository } from 'typeorm';
export declare class OrderService {
    private orderRepository;
    private cartService;
    constructor(orderRepository: Repository<OrderEntity>, cartService: CartService);
    order(user: string): Promise<OrderEntity>;
    getOrders(user: string): Promise<OrderEntity[]>;
}
