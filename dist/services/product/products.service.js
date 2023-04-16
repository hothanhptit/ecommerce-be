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
var Order;
(function (Order) {
})(Order = exports.Order || (exports.Order = {}));
let ProductsService = class ProductsService {
    constructor(productRepository, relatedProducts) {
        this.productRepository = productRepository;
        this.relatedProducts = relatedProducts;
        this.logging = new log4js_service_1.LogServices();
    }
    async getAll(options, orderBy, filter) {
        if (filter)
            return this.searchProducts(options, orderBy, filter);
        const orderDirection = orderBy
            ? { updatedAt: 'DESC' }
            : { updatedAt: 'ASC' };
        const queryBuilder = this.productRepository
            .createQueryBuilder('prod')
            .where('prod.status= :status', { status: 1 })
            .orderBy('prod.updatedAt', 'DESC')
            .cache('product', 30 * 1000);
        const productsPage = await (0, paginate_1.paginate)(queryBuilder, options);
        if (productsPage) {
            productsPage.items.forEach((item) => {
                item.productImages = JSON.parse(item.productImages);
            });
        }
        return productsPage;
    }
    async searchProducts(options, orderBy, filter) {
        const slug = (0, fn_1.removeVietnameseTones)(filter);
        const queryBuilder = this.productRepository
            .createQueryBuilder('prod')
            .where('prod.status= :status', { status: 1 })
            .andWhere('prod.slug like :slug', { slug: `%${slug}%` })
            .orderBy('prod.updatedAt', 'DESC')
            .cache('product', 30 * 1000);
        console.log(queryBuilder.getSql());
        const productsPage = await (0, paginate_1.paginate)(queryBuilder, options);
        if (productsPage) {
            productsPage.items.forEach((item) => {
                item.productImages = JSON.parse(item.productImages);
            });
        }
        return productsPage;
    }
    async create(productDTO, files, relatedProduct, user) {
        try {
            if (user.role == 'admin') {
                let saveProduct = Object.assign(new product_entity_1.Product(), productDTO);
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
                    const relatedPro = new Set(JSON.parse(relatedProduct));
                    for (const id of relatedPro) {
                        const data = await this.productRepository.findOne({
                            where: { id: id },
                        });
                        if (data) {
                            const related = new relatedProduct_entity_1.RelatedProduct();
                            related.productId = id;
                            related.images = data.productImages;
                            related.name = data.name;
                            this.relatedProducts.save(related);
                            saveProduct.related.push(related);
                        }
                    }
                }
                saveProduct.slug = (0, fn_1.removeVietnameseTones)(productDTO.name);
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
        throw new common_1.NotFoundException();
    }
    async update(id, productDTO, relatedProduct, files, user) {
        try {
            if (user.role == 'admin') {
                let saveProduct = Object.assign(new product_entity_1.Product(), productDTO);
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
                    saveProduct.related = [];
                    const relatedPro = new Set(JSON.parse(relatedProduct));
                    for (const id of relatedPro) {
                        const data = await this.productRepository.findOne({
                            where: { id: id },
                        });
                        if (data) {
                            const related = new relatedProduct_entity_1.RelatedProduct();
                            related.productId = id;
                            related.images = data.productImages;
                            related.name = data.name;
                            this.relatedProducts.save(related);
                            saveProduct.related.push(related);
                        }
                    }
                }
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map