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
import { ProductInfoDTO } from './dto/product-info.dto';
import { ProductInfo } from './entities/product-info.entity';
import { compessImg } from 'src/utils/convertFile.ultis';

export const Order = 'ASC' || 'DESC';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(RelatedProduct)
    private relatedProducts: Repository<RelatedProduct>,
    @InjectRepository(ProductInfo)
    private productInfoRepo: Repository<ProductInfo>,
  ) {}

  private logging = new LogServices();

  async getAll(
    options: IPaginationOptions,
    orderBy: any,
    filter: string,
    category: string,
  ): Promise<Pagination<Product>> {
    const orderDirection = orderBy
      ? { updatedAt: 'DESC' }
      : { updatedAt: 'ASC' };

    // provide builder to paginate
    let queryBuilder;
    if (category) {
      if (filter)
        return this.searchProductsBySlug(options, orderBy, filter, category);
      queryBuilder = this.productRepository
        .createQueryBuilder('prod')
        .where('prod.status= :status', { status: 1 })
        .andWhere('prod.categoryId= :cat', { cat: category })
        .orderBy('prod.updatedAt', orderBy)
        .cache('product', 30 * 1000);
    } else {
      queryBuilder = this.productRepository
        .createQueryBuilder('prod')
        .where('prod.status= :status', { status: 1 })
        .orderBy('prod.updatedAt', 'DESC')
        .cache('product', 30 * 1000);
    }

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
    if (filter) return this.searchProductsBySlug(options, orderBy, filter);
    const productsPage = await paginate<Product>(queryBuilder, options);
    if (productsPage) {
      productsPage.items.forEach((item) => {
        if (item.images) item.images = JSON.parse(item.images);
        if (item.imagesCompress)
          item.imagesCompress = JSON.parse(item.imagesCompress);
        const images = [];
        const imagesCompress = [];
        for (let image of item.images) {
          const domain_image =
            (process.env.HOST || 'http://localhost:4000') + image;
          images.push(domain_image);
        }
        for (let image of item?.imagesCompress) {
          const compress =
            (process.env.HOST || 'http://localhost:4000') + image;
          imagesCompress.push(compress);
        }
        // @ts-ignore
        data.imagesCompress = imagesCompress;
        // @ts-ignore
        item.images = images;
        // if (item.info) item.info.catalogue = JSON.parse(item.info.catalogue);
      });
    }
    return productsPage;
  }
  async getFeatured(
    options: IPaginationOptions,
    orderBy: string,
  ): Promise<Pagination<Product>> {
    const orderDirection = orderBy
      ? { updatedAt: 'DESC' }
      : { updatedAt: 'ASC' };

    const queryBuilder = this.productRepository
      .createQueryBuilder('prod')
      .where('prod.status= :status', { status: 1 })
      .andWhere('prod.isFeatured= :isFeatured', { isFeatured: 1 })
      .orderBy('prod.updatedAt', 'DESC')
      .cache('product', 30 * 1000);

    const productsPage = await paginate<Product>(queryBuilder, options);

    if (productsPage) {
      productsPage.items.forEach((item) => {
        if (item.images) item.images = JSON.parse(item.images);
        if (item.imagesCompress) item.images = JSON.parse(item.imagesCompress);
        const images = [];
        const imagesCompress = [];
        for (let image of item.images) {
          const domain_image =
            (process.env.HOST || 'http://localhost:4000') + image;
          images.push(domain_image);
        }
        for (let image of item?.imagesCompress) {
          const compress =
            (process.env.HOST || 'http://localhost:4000') + image;
          imagesCompress.push(compress);
        }
        // @ts-ignore
        data.imagesCompress = imagesCompress;
        // @ts-ignore
        item.images = images;
        // if (item.info) item.info.catalogue = JSON.parse(item.info.catalogue);
      });
    }
    return productsPage;
  }

  async searchProductsBySlug(
    options: IPaginationOptions,
    orderBy: any,
    filter: string,
    category?: string,
  ): Promise<Pagination<Product>> {
    // provide builder to paginate
    const slug = removeVietnameseTones(filter);
    let queryBuilder;
    if (category) {
      queryBuilder = this.productRepository
        .createQueryBuilder('prod')
        .where('prod.status= :status', { status: 1 })
        .andWhere('prod.slug like :slug', { slug: `%${slug}%` })
        .andWhere('prod.categoryId= :category', { category: category })
        .orderBy('prod.updatedAt', orderBy)
        .cache('product', 30 * 1000);
    } else {
      queryBuilder = this.productRepository
        .createQueryBuilder('prod')
        .where('prod.status= :status', { status: 1 })
        .andWhere('prod.slug like :slug', { slug: `%${slug}%` })
        // .andWhere('MATCH(prod.slug) AGAINST (:slug IN BOOLEAN MODE)', { slug: slug })
        .orderBy('prod.updatedAt', orderBy)
        .cache('product', 30 * 1000);
    }
    const productsPage = await paginate<Product>(queryBuilder, options);

    if (productsPage) {
      productsPage.items.forEach((item) => {
        if (item.images) item.images = JSON.parse(item.images);
        if (item.imagesCompress)
          item.imagesCompress = JSON.parse(item.imagesCompress);
        const images = [];
        const imagesCompress = [];
        for (let image of item.images) {
          const domain_image =
            (process.env.HOST || 'http://localhost:4000') + image;
          images.push(domain_image);
        }
        for (let image of item?.imagesCompress) {
          const compress =
            (process.env.HOST || 'http://localhost:4000') + image;
          imagesCompress.push(compress);
        }
        // @ts-ignore
        data.imagesCompress = imagesCompress;
        // @ts-ignore
        item.images = images;
        // if (item.info) item.info.catalogue = JSON.parse(item.info.catalogue);
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
        let saveProductInfo = new ProductInfo();
        if (files.catalogue) {
          const catalogue = [];
          for (const [index, file] of files.catalogue.entries()) {
            catalogue[index] = file.path.replace('\\', '/');
          }
          saveProductInfo.catalogue = JSON.stringify(catalogue);
        }

        // saveProductInfo.catalogue = productDTO.catalogue || null;
        saveProductInfo.code = productDTO.code || null;
        saveProductInfo.manufacturer = productDTO.manufacturer || null;
        saveProductInfo.model = productDTO.model || null;
        saveProductInfo.origin = productDTO.origin || null;
        saveProductInfo.warranty = productDTO.warranty || null;
        saveProductInfo.rating = productDTO.rating || null;

        if (files.images) {
          const images = [];
          const imagesCompress = [];
          for (const [index, file] of files.images.entries()) {
            images[index] = file.path.replace('\\', '/');
            const cpImg = await compessImg(
              file.path,
              400,
              undefined,
              file?.mimetype.split('/')[1],
            );
            imagesCompress.push(cpImg.replace('\\', '/'));
          }
          saveProduct.imagesCompress = JSON.stringify(imagesCompress);
          saveProduct.images = JSON.stringify(images);
        }

        if (files.descriptionImages) {
          const descriptionImages = [];
          for (const [index, file] of files.descriptionImages.entries()) {
            descriptionImages[index] = file.path.replace('\\', '/');
          }
          saveProduct.descriptionImages = JSON.stringify(descriptionImages);
        }

        if (files.specsImages) {
          const specsImages = [];
          for (const [index, file] of files.specsImages.entries()) {
            specsImages[index] = file.path.replace('\\', '/');
          }
          saveProduct.specsImages = JSON.stringify(specsImages);
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
              related.images = data.images;
              related.name = data.name;
              this.relatedProducts.save(related);
              saveProduct.related.push(related);
            }
          }
        }
        saveProduct.slug = removeVietnameseTones(productDTO.name);
        const prodInfo = await this.productInfoRepo.manager.save(
          saveProductInfo,
        );
        saveProduct.info = prodInfo;
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
        info: true,
      },
      cache: false,
    });

    if (data) {
      data.images = JSON.parse(data.images);
      data.imagesCompress = JSON.parse(data.imagesCompress);
      const images = [];
      const imagesCompress = [];
      for (let image of data.images) {
        const domain_image =
          (process.env.HOST || 'http://localhost:4000') + image;
        images.push(domain_image);
      }
      for (let image of data?.imagesCompress) {
        const compress = (process.env.HOST || 'http://localhost:4000') + image;
        imagesCompress.push(compress);
      }
      // @ts-ignore
      data.images = images;
      // @ts-ignore
      data.imagesCompress = imagesCompress;

      if (data?.related?.length) {
        data.related.forEach((element, idx) => {
          data.related[idx].images = JSON.parse(element.images);
          data.related[idx].imagesCompress = JSON.parse(element.imagesCompress);
          const related_images = [];
          const imagesCompressRelated = [];
          for (let image of data.related[idx].images) {
            const domain_image =
              (process.env.HOST || 'http://localhost:4000') + image;
            related_images.push(domain_image);
          }
          for (let image of data?.imagesCompress) {
            const compress =
              (process.env.HOST || 'http://localhost:4000') + image;
            imagesCompressRelated.push(compress);
          }
          // @ts-ignore
          data.related[idx].imagesCompress = imagesCompressRelated;
          // @ts-ignore
          data.related[idx].images = related_images;
        });
      }
      if (data?.info?.catalogue?.length) {
        data.info.catalogue = JSON.parse(data.info.catalogue);
        const catalogues = [];
        for (let cat of data.info.catalogue) {
          const cats = (process.env.HOST || 'http://localhost:4000') + cat;
          catalogues.push(cats);
        }
        // @ts-ignore
        data.info.catalogue = catalogues;
      }
      // if (data.catalogue) {
      //   data.catalogue = JSON.parse(data.catalogue);
      // }

      return data;
    }
    throw new NotFoundException();
  }

  async update(
    id: string,
    productDTO: ProductDTO,
    relatedProduct: string | null,
    images: any,
    catalogue: any,
    user: User,
  ): Promise<Product> {
    try {
      if (user.role == 'admin') {
        let saveProduct = Object.assign(new Product(), productDTO);

        let saveProductInfo = new ProductInfo();

        if (catalogue) {
          for (const [index, file] of catalogue.entries()) {
            catalogue[index] = file.path.replace('\\', '/');
          }
          saveProductInfo.catalogue = JSON.stringify(catalogue);
        }
        // saveProductInfo.catalogue = productDTO.catalogue || null;
        saveProductInfo.code = productDTO.code || null;
        saveProductInfo.manufacturer = productDTO.manufacturer || null;
        saveProductInfo.model = productDTO.model || null;
        saveProductInfo.origin = productDTO.origin || null;
        saveProductInfo.warranty = productDTO.warranty || null;
        saveProductInfo.rating = productDTO.rating || null;

        const product = await this.productRepository.findOne({
          where: { id: id },
          relations: {
            related: true,
            info: true,
          },
        });

        if (images) {
          const imagesCompress = [];
          for (const [index, file] of images.entries()) {
            images[index] = file.path.replace('\\', '/');
            const cpImg = await compessImg(
              file.path,
              400,
              undefined,
              file?.mimetype.split('/')[1],
            );
            imagesCompress.push(cpImg.replace('\\', '/'));
          }
          saveProduct.imagesCompress = JSON.stringify(imagesCompress);
          saveProduct.images = JSON.stringify(images);
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
              related.images = data.images;
              related.name = data.name;
              this.relatedProducts.save(related);
              saveProduct.related.push(related);
            }
          }
        }

        const prodInfo = await this.productInfoRepo.manager.save(
          saveProductInfo,
        );
        saveProduct.info = prodInfo;

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
