import { RelatedProduct } from './entities/relatedProduct.entity';
import { LogServices } from './../log4js/log4js.service';
import { ProductDTO } from './dto/product.dto';
import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/services/auth/entities/user.entity';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(RelatedProduct)
    private relatedProducts: Repository<RelatedProduct>,
  ) {}

  private logging = new LogServices();

  async getAll(options: IPaginationOptions): Promise<Pagination<Product>> {
    return paginate<Product>(this.productRepository, options, {
      where: { status: 1 },
    });
  }

  async create(
    productDTO: ProductDTO,
    files: any,
    relatedProduct: string,
    user: User,
  ) {
    try {
      if (user.role == 'admin') {
        let saveProduct = Object.assign(new Product(), productDTO);

        if (files.productImages) {
          const productImages = {};
          for (const [index, file] of files.productImages.entries()) {
            productImages[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }
          saveProduct.productImages = JSON.stringify(productImages);
        }

        if (files.descriptionImages) {
          const descriptionImages = {};
          for (const [index, file] of files.descriptionImages.entries()) {
            descriptionImages[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }
          saveProduct.descriptionImages = JSON.stringify(descriptionImages);
        }

        if (files.specsImages) {
          const specsImages = {};
          for (const [index, file] of files.specsImages.entries()) {
            specsImages[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }
          saveProduct.specsImages = JSON.stringify(specsImages);
        }

        if (!!relatedProduct) {
          saveProduct.related = [];
          const relatedPro = new Set(JSON.parse(relatedProduct)) as Set<string>;
          // TODO: switch to select in() and create related after that
          // console.log(relatedPro);
          for (const id of relatedPro) {
            const data = await this.productRepository.findOne({
              where: { id: id },
            });

            if (data) {
              const related = new RelatedProduct();
              related.productId = id;
              related.images = data.productImages;
              related.name = data.name;
              this.relatedProducts.save(related);
              saveProduct.related.push(related);
            }
          }
        }
        // console.log(saveProduct);

        const res = await this.productRepository.manager.save(saveProduct);
        return res;
      }
      this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
    } catch (error) {
      console.log(error);
      if (error.status === 401) throw new UnauthorizedException();
      throw new ServiceUnavailableException();
    }
  }

  async getOne(productId: string) {
    const data = await this.productRepository.findOne({
      where: { id: productId },
      relations: {
        related: true,
      },
    });
    if (data) return data;
    throw new NotFoundException();
  }

  async update(
    id: string,
    productDTO: ProductDTO,
    relatedProduct: string | null,
    files: any,
    user: User,
  ): Promise<Product> {
    try {
      if (user.role == 'admin') {
        let saveProduct = Object.assign(new Product(), productDTO);

        const product = await this.productRepository.findOne({
          where: { id: id },
          relations: {
            related: true,
          },
        });

        if (files.productImages) {
          const productImages = {};
          for (const [index, file] of files.productImages.entries()) {
            productImages[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }

          saveProduct.productImages = JSON.stringify(productImages);
        }
        // console.log(product);
        if (!!relatedProduct) {
          // saveProduct.related = [...product.related];
          saveProduct.related = [];
          const relatedPro = new Set(JSON.parse(relatedProduct)) as Set<string>;
          // TODO: switch to select in() and create related after that
          for (const id of relatedPro) {
            const data = await this.productRepository.findOne({
              where: { id: id },
            });

            if (data) {
              const related = new RelatedProduct();
              related.productId = id;
              related.images = data.productImages;
              related.name = data.name;
              this.relatedProducts.save(related);
              saveProduct.related.push(related);
            }
          }
        }

        return await this.productRepository.save({
          ...product,
          ...saveProduct,
        });
      }
      this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
    } catch (error) {
      console.log(error);
      this.logging.getLogger('debug').debug(error);
      if (error.status === 401) throw new UnauthorizedException();
      throw new ServiceUnavailableException();
    }
  }

  async delete(id: number, user: User): Promise<DeleteResult> {
    try {
      if (user.role == 'admin') {
        return await this.productRepository.delete(id);
      }
    } catch (error) {
      this.logging.getLogger('debug').debug(error);
      if (error.status === 401) {
        this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
        throw new UnauthorizedException();
      }
      throw new ServiceUnavailableException();
    }
  }
}
