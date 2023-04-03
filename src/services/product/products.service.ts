import { LogServices } from './../log4js/log4js.service';
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
  ) {}

  private logging = new LogServices();

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(product: ProductDTO, files: any, user: User): Promise<Product> {
    if (user.role == 'admin') {
      let saveProduct = Object.assign(new Product(), product);
      const productImages = {};
      const descriptionImages = {};
      const specsImages = {};
      for (const [index, file] of files.productImages.entries()) {
        productImages[index] =
          process.env.HOST ||
          'http://localhost:4000/' + file.path.replace('\\', '/');
      }
      for (const [index, file] of files.descriptionImages.entries()) {
        descriptionImages[index] =
          process.env.HOST ||
          'http://localhost:4000/' + file.path.replace('\\', '/');
      }
      for (const [index, file] of files.specsImages.entries()) {
        specsImages[index] =
          process.env.HOST ||
          'http://localhost:4000/' + file.path.replace('\\', '/');
      }

      saveProduct.productImages = JSON.stringify(productImages);
      saveProduct.descriptionImages = JSON.stringify(descriptionImages);
      saveProduct.specsImages = JSON.stringify(specsImages);
      console.log('====================================');
      console.log(saveProduct instanceof Product);
      console.log(saveProduct);
      console.log('====================================');

      return await this.productRepository.save(saveProduct);
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
