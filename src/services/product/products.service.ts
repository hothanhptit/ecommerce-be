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
        console.log('====================================');
        console.log(saveProduct);
        console.log('====================================');
        const productImages = {};
        const descriptionImages = {};
        const specsImages = {};
        if (files.productImages) {
          for (const [index, file] of files.productImages.entries()) {
            productImages[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }
          saveProduct.productImages = JSON.stringify(productImages);
        }
        if (files.descriptionImages) {
          for (const [index, file] of files.descriptionImages.entries()) {
            descriptionImages[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }
          saveProduct.descriptionImages = JSON.stringify(descriptionImages);
        }
        if (files.specsImages) {
          for (const [index, file] of files.specsImages.entries()) {
            specsImages[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }
          saveProduct.specsImages = JSON.stringify(specsImages);
        }
        if (relatedProduct) {
          const relatedPro = JSON.parse(relatedProduct);

          for (const id in relatedPro) {
            const related = new RelatedProduct();
            related.productId = relatedPro[id];
            await this.relatedProducts.save(related);
            console.log(related);
            // data.push(related)
            // saveProduct.related.push(related);
          }
        }
        const a = new RelatedProduct();
        // a.productId = '475dd678-f1a1-4fb8-a697-a63b9a543661';
        const b = new Product()
        b.name = "123"
        b.summary = "123"
        b.price = "123"
        b.description = "123"
        b.specs = "123"
        b.detailsDescription = "123"
        b.categoryId = "123"
        b.type = "123"
        b.catalogue = "123"
        b.productImages = "123"
      
        const ab = await this.productRepository.manager.save(b);
        console.log(ab);
        await this.relatedProducts.manager.save(a);

        // console.log(data1);

        // return savedProd;
      }
      this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
    } catch (error) {
      console.log(error);
      if (error.status === 401) throw new UnauthorizedException();
      throw new ServiceUnavailableException();
    }
  }

  async getOne(productId: string) {
    // const data = await this.productRepository
    //   .createQueryBuilder()
    //   .innerJoinAndSelect(RelatedProduct, 'related_product', 'product.id = related_product.productId')
    //   .where('product.id = :id', { id: productId })
    //   .getRawMany();
    const data = await this.productRepository.findOne({
      where: { id: productId },
      relations: {
        related: true,
      },
    });
    console.log(data);

    if (data) return data;
    throw new NotFoundException();
  }

  async update(
    id: string,
    productDTO: ProductDTO,
    files: any,
    user: User,
  ): Promise<Product> {
    try {
      if (user.role == 'admin') {
        let saveProduct = Object.assign(new Product(), productDTO);
        // saveProduct.related = [] as RelatedProduct[]

        console.log('====================================');
        console.log(123);
        console.log('====================================');
        // if (productDTO.related) {
        //   const relatedPro = JSON.parse(productDTO.related);
        //   for (const prod of relatedPro) {
        //     const related = new RelatedProduct();
        //     related.product = prod;
        //     await this.relatedProducts.save(related);
        //     saveProduct.related.push(related);
        //   }
        // }
        const product = await this.productRepository.findOne({
          where: { id: id },
        });
        const productImages = {};
        if (files.productImages) {
          for (const [index, file] of files.productImages.entries()) {
            productImages[index] =
              process.env.HOST ||
              'http://localhost:4000/' + file.path.replace('\\', '/');
          }

          saveProduct.productImages = JSON.stringify(productImages);
        }

        return await this.productRepository.save({
          ...product,
          ...saveProduct,
        });
      }
      this.logging.getLogger('warning').warn('Unauthorize access: ' + user);

      throw new UnauthorizedException();
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async delete(id: number, user: User): Promise<DeleteResult> {
    try {
      if (user.role == 'admin') {
        return await this.productRepository.delete(id);
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
