import { Log4js } from './../log4js/log4js.service';
import { ProductDTO } from './dto/product.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/services/auth/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private logging: Log4js,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(
    product: ProductDTO,
    file: Express.Multer.File,
    user: User,
  ): Promise<Product> {
    if (user.role == 'admin') {
      product.file = file.path;
      return await this.productRepository.save(product);
    }
    this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
    throw new UnauthorizedException();
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    product: Product,
    user: User,
  ): Promise<UpdateResult> {
    if (user.role == 'admin') {
      return await this.productRepository.update(id, product);
    }
    throw new UnauthorizedException();
  }

  async delete(id: number, user: User): Promise<DeleteResult> {
    if (user.role == 'admin') {
      return await this.productRepository.delete(id);
    }
    throw new UnauthorizedException();
  }
}
