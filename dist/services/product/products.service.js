"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = exports.Order = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paginate_1 = require("nestjs-typeorm-paginate/dist/paginate");
const fn_1 = require("../../utils/fn");
const typeorm_2 = require("typeorm");
const log4js_service_1 = require("./../log4js/log4js.service");
const product_entity_1 = require("./entities/product.entity");
const relatedProduct_entity_1 = require("./entities/relatedProduct.entity");
const product_info_entity_1 = require("./entities/product-info.entity");
const convertFile_ultis_1 = require("../../utils/convertFile.ultis");
exports.Order = 'ASC' || 'DESC';
let ProductsService = class ProductsService {
    constructor(productRepository, relatedProducts, productInfoRepo) {
        this.productRepository = productRepository;
        this.relatedProducts = relatedProducts;
        this.productInfoRepo = productInfoRepo;
        this.logging = new log4js_service_1.LogServices();
    }
    async getAll(options, orderBy, filter, category) {
        const orderDirection = orderBy
            ? { updatedAt: 'DESC' }
            : { updatedAt: 'ASC' };
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
        }
        else {
            queryBuilder = this.productRepository
                .createQueryBuilder('prod')
                .where('prod.status= :status', { status: 1 })
                .orderBy('prod.updatedAt', 'DESC')
                .cache('product', 30 * 1000);
        }
        if (filter)
            return this.searchProductsBySlug(options, orderBy, filter);
        const productsPage = await (0, paginate_1.paginate)(queryBuilder, options);
        if (productsPage) {
            productsPage.items.forEach((item) => {
                if (item.images)
                    item.images = JSON.parse(item.images);
                if (item.imagesCompress)
                    item.imagesCompress = JSON.parse(item.imagesCompress);
                const images = [];
                const imagesCompress = [];
                for (let image of item.images) {
                    const domain_image = (process.env.HOST || 'http://localhost:4000') + image;
                    images.push(domain_image);
                }
                if (item === null || item === void 0 ? void 0 : item.imagesCompress)
                    for (let image of item === null || item === void 0 ? void 0 : item.imagesCompress) {
                        const compress = (process.env.HOST || 'http://localhost:4000') + image;
                        imagesCompress.push(compress);
                    }
                item.imagesCompress = imagesCompress;
                item.images = images;
            });
        }
        return productsPage;
    }
    async getFeatured(options, orderBy) {
        const orderDirection = orderBy
            ? { updatedAt: 'DESC' }
            : { updatedAt: 'ASC' };
        const queryBuilder = this.productRepository
            .createQueryBuilder('prod')
            .where('prod.status= :status', { status: 1 })
            .andWhere('prod.isFeatured= :isFeatured', { isFeatured: 1 })
            .orderBy('prod.updatedAt', 'DESC')
            .cache('product', 30 * 1000);
        const productsPage = await (0, paginate_1.paginate)(queryBuilder, options);
        if (productsPage) {
            productsPage.items.forEach((item) => {
                if (item.images)
                    item.images = JSON.parse(item.images);
                if (item.imagesCompress)
                    item.images = JSON.parse(item.imagesCompress);
                const images = [];
                const imagesCompress = [];
                for (let image of item.images) {
                    const domain_image = (process.env.HOST || 'http://localhost:4000') + image;
                    images.push(domain_image);
                }
                if (item === null || item === void 0 ? void 0 : item.imagesCompress)
                    for (let image of item === null || item === void 0 ? void 0 : item.imagesCompress) {
                        const compress = (process.env.HOST || 'http://localhost:4000') + image;
                        imagesCompress.push(compress);
                    }
                item.imagesCompress = imagesCompress;
                item.images = images;
            });
        }
        return productsPage;
    }
    async searchProductsBySlug(options, orderBy, filter, category) {
        const slug = (0, fn_1.removeVietnameseTones)(filter);
        let queryBuilder;
        if (category) {
            queryBuilder = this.productRepository
                .createQueryBuilder('prod')
                .where('prod.status= :status', { status: 1 })
                .andWhere('prod.slug like :slug', { slug: `%${slug}%` })
                .andWhere('prod.categoryId= :category', { category: category })
                .orderBy('prod.updatedAt', orderBy)
                .cache('product', 30 * 1000);
        }
        else {
            queryBuilder = this.productRepository
                .createQueryBuilder('prod')
                .where('prod.status= :status', { status: 1 })
                .andWhere('prod.slug like :slug', { slug: `%${slug}%` })
                .orderBy('prod.updatedAt', orderBy)
                .cache('product', 30 * 1000);
        }
        const productsPage = await (0, paginate_1.paginate)(queryBuilder, options);
        if (productsPage) {
            productsPage.items.forEach((item) => {
                if (item.images)
                    item.images = JSON.parse(item.images);
                if (item.imagesCompress)
                    item.imagesCompress = JSON.parse(item.imagesCompress);
                const images = [];
                const imagesCompress = [];
                for (let image of item.images) {
                    const domain_image = (process.env.HOST || 'http://localhost:4000') + image;
                    images.push(domain_image);
                }
                if (item === null || item === void 0 ? void 0 : item.imagesCompress)
                    for (let image of item === null || item === void 0 ? void 0 : item.imagesCompress) {
                        const compress = (process.env.HOST || 'http://localhost:4000') + image;
                        imagesCompress.push(compress);
                    }
                item.imagesCompress = imagesCompress;
                item.images = images;
            });
        }
        return productsPage;
    }
    async create(productDTO, files, relatedProduct, user) {
        try {
            if (user.role == 'admin') {
                let saveProduct = Object.assign(new product_entity_1.Product(), productDTO);
                let saveProductInfo = new product_info_entity_1.ProductInfo();
                if (files.catalogue) {
                    const catalogue = [];
                    for (const [index, file] of files.catalogue.entries()) {
                        catalogue[index] = file.path.replace('\\', '/');
                    }
                    saveProductInfo.catalogue = JSON.stringify(catalogue);
                }
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
                        const cpImg = await (0, convertFile_ultis_1.compessImg)(file.path, 400, undefined, file === null || file === void 0 ? void 0 : file.mimetype.split('/')[1]);
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
                    const relatedPro = new Set(JSON.parse(relatedProduct));
                    for (const id of relatedPro) {
                        const data = await this.productRepository.findOne({
                            where: { id: id },
                        });
                        if (data) {
                            const related = new relatedProduct_entity_1.RelatedProduct();
                            related.productId = id;
                            related.images = data.images;
                            related.name = data.name;
                            this.relatedProducts.save(related);
                            saveProduct.related.push(related);
                        }
                    }
                }
                saveProduct.slug = (0, fn_1.removeVietnameseTones)(productDTO.name);
                const prodInfo = await this.productInfoRepo.manager.save(saveProductInfo);
                saveProduct.info = prodInfo;
                const res = await this.productRepository.manager.save(saveProduct);
                return res;
            }
            this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
        }
        catch (error) {
            console.log(error);
            if (error.status === 401)
                throw new common_1.UnauthorizedException();
            throw new common_1.ServiceUnavailableException();
        }
    }
    async getOne(productId) {
        var _a, _b, _c;
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
                const domain_image = (process.env.HOST || 'http://localhost:4000') + image;
                images.push(domain_image);
            }
            if (data === null || data === void 0 ? void 0 : data.imagesCompress)
                for (let image of data === null || data === void 0 ? void 0 : data.imagesCompress) {
                    const compress = (process.env.HOST || 'http://localhost:4000') + image;
                    imagesCompress.push(compress);
                }
            data.images = images;
            data.imagesCompress = imagesCompress;
            if ((_a = data === null || data === void 0 ? void 0 : data.related) === null || _a === void 0 ? void 0 : _a.length) {
                data.related.forEach((element, idx) => {
                    data.related[idx].images = JSON.parse(element.images);
                    data.related[idx].imagesCompress = JSON.parse(element.imagesCompress);
                    const related_images = [];
                    const imagesCompressRelated = [];
                    for (let image of data.related[idx].images) {
                        const domain_image = (process.env.HOST || 'http://localhost:4000') + image;
                        related_images.push(domain_image);
                    }
                    if (data === null || data === void 0 ? void 0 : data.imagesCompress)
                        if (data === null || data === void 0 ? void 0 : data.related[idx].imagesCompress)
                            for (let image of data.related[idx].imagesCompress) {
                                const compress = (process.env.HOST || 'http://localhost:4000') + image;
                                imagesCompressRelated.push(compress);
                            }
                    data.related[idx].imagesCompress = imagesCompressRelated;
                    data.related[idx].images = related_images;
                });
            }
            if ((_c = (_b = data === null || data === void 0 ? void 0 : data.info) === null || _b === void 0 ? void 0 : _b.catalogue) === null || _c === void 0 ? void 0 : _c.length) {
                data.info.catalogue = JSON.parse(data.info.catalogue);
                const catalogues = [];
                for (let cat of data.info.catalogue) {
                    const cats = (process.env.HOST || 'http://localhost:4000') + cat;
                    catalogues.push(cats);
                }
                data.info.catalogue = catalogues;
            }
            return data;
        }
        throw new common_1.NotFoundException();
    }
    async update(id, productDTO, relatedProduct, images, catalogue, user) {
        try {
            if (user.role == 'admin') {
                let saveProduct = Object.assign(new product_entity_1.Product(), productDTO);
                let saveProductInfo = new product_info_entity_1.ProductInfo();
                if (catalogue) {
                    for (const [index, file] of catalogue.entries()) {
                        catalogue[index] = file.path.replace('\\', '/');
                    }
                    saveProductInfo.catalogue = JSON.stringify(catalogue);
                }
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
                        const cpImg = await (0, convertFile_ultis_1.compessImg)(file.path, 400, undefined, file === null || file === void 0 ? void 0 : file.mimetype.split('/')[1]);
                        imagesCompress.push(cpImg.replace('\\', '/'));
                    }
                    saveProduct.imagesCompress = JSON.stringify(imagesCompress);
                    saveProduct.images = JSON.stringify(images);
                }
                if (!!relatedProduct) {
                    saveProduct.related = [];
                    const relatedPro = new Set(JSON.parse(relatedProduct));
                    for (const id of relatedPro) {
                        const data = await this.productRepository.findOne({
                            where: { id: id },
                        });
                        if (data) {
                            const related = new relatedProduct_entity_1.RelatedProduct();
                            related.productId = id;
                            related.images = data.images;
                            related.name = data.name;
                            this.relatedProducts.save(related);
                            saveProduct.related.push(related);
                        }
                    }
                }
                const prodInfo = await this.productInfoRepo.manager.save(saveProductInfo);
                saveProduct.info = prodInfo;
                return await this.productRepository.save(Object.assign(Object.assign({}, product), saveProduct));
            }
            this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
        }
        catch (error) {
            console.log(error);
            this.logging.getLogger('debug').debug(error);
            if (error.status === 401)
                throw new common_1.UnauthorizedException();
            throw new common_1.ServiceUnavailableException();
        }
    }
    async delete(id, user) {
        try {
            if (user.role == 'admin') {
                return await this.productRepository.delete(id);
            }
        }
        catch (error) {
            this.logging.getLogger('debug').debug(error);
            if (error.status === 401) {
                this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
                throw new common_1.UnauthorizedException();
            }
            throw new common_1.ServiceUnavailableException();
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(relatedProduct_entity_1.RelatedProduct)),
    __param(2, (0, typeorm_1.InjectRepository)(product_info_entity_1.ProductInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map