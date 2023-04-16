import { filter } from 'rxjs';
import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { User } from 'src/services/auth/entities/user.entity';
import { removeVietnameseTones } from 'src/utils/fn';
import { DeleteResult, Repository } from 'typeorm';
import { LogServices } from './../log4js/log4js.service';
import { ProductDTO } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { RelatedProduct } from './entities/relatedProduct.entity';

export enum Order {}
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(RelatedProduct)
    private relatedProducts: Repository<RelatedProduct>,
  ) {}

  private logging = new LogServices();

  async getAll(
    options: IPaginationOptions,
    orderBy: string,
    filter: string,
  ): Promise<Pagination<Product>> {
    if (filter) return this.searchProducts(options, orderBy, filter);
    const orderDirection = orderBy
      ? { updatedAt: 'DESC' }
      : { updatedAt: 'ASC' };

    // provide builder to paginate
    const queryBuilder = this.productRepository
      .createQueryBuilder('prod')
      .where('prod.status= :status', { status: 1 })
      .orderBy('prod.updatedAt', 'DESC')
      .cache('product', 30 * 1000);

    const productsPage = await paginate<Product>(queryBuilder, options);

    // or get all through where options
    // const productsPage = await paginate<Product>(
    //   this.productRepository,
    //   options,
    //   {
    //     where: { status: 1 },
    //     order: {
    //       updatedAt: 'DESC',
    //     },
    //     cache: true,
    //   },
    // );
    if (productsPage) {
      productsPage.items.forEach((item) => {
        item.productImages = JSON.parse(item.productImages);
      });
    }
    return productsPage;
  }

  async searchProducts(
    options: IPaginationOptions,
    orderBy: string,
    filter: string,
  ): Promise<Pagination<Product>> {
    // provide builder to paginate
    const slug = removeVietnameseTones(filter);
    const queryBuilder = this.productRepository
      .createQueryBuilder('prod')
      .where('prod.status= :status', { status: 1 })
      .andWhere('prod.slug like :slug', { slug: `%${slug}%` })
      // .andWhere('MATCH(prod.slug) AGAINST (:slug IN BOOLEAN MODE)', { slug: slug })
      .orderBy('prod.updatedAt', 'DESC')
      .cache('product', 30 * 1000);
    console.log(queryBuilder.getSql());
    const productsPage = await paginate<Product>(queryBuilder, options);

    if (productsPage) {
      productsPage.items.forEach((item) => {
        item.productImages = JSON.parse(item.productImages);
      });
    }
    return productsPage;
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
        if (files.catalogue) {
          const catalogue = {};
          for (const [index, file] of files.catalogue.entries()) {
            catalogue[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }
          saveProduct.catalogue = JSON.stringify(catalogue);
        }

        if (!!relatedProduct) {
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
        saveProduct.slug = removeVietnameseTones(productDTO.name);
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
      cache: false
    });
    if (data) {
      data.productImages = JSON.parse(data.productImages);
      return data;
    }
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
