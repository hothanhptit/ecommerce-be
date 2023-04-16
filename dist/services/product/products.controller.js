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
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const multiFiles_swagger_1 = require("./../../utils/multiFiles.swagger");
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const product_dto_1 = require("./dto/product.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async GetAll(page = 1, limit = 16, orderBy = 'created_at', filter = '') {
        limit = limit > 100 ? 100 : limit;
        return await this.productsService.getAll({
            page,
            limit,
            route: process.env.host || 'http://localhost:4000' + '/api/v1/products',
        }, orderBy, filter);
    }
    async Create(req, product, files) {
        return await this.productsService.create(product, files, req.body.related, req.user);
    }
    async GetOne(id) {
        return await this.productsService.getOne(id.id);
    }
    async Update(id, product, files, req) {
        return await this.productsService.update(id.id, product, req.body.related, files, req.user);
    }
    async Delete(id, req) {
        return await this.productsService.delete(id, req.user);
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(16), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('orderBy')),
    __param(3, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "GetAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, multiFiles_swagger_1.ApiMultiFile)('images'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    format: 'string',
                },
                images: {
                    type: 'string',
                    format: 'binary',
                },
                sumary: {
                    type: 'string',
                    format: 'string',
                },
                price: {
                    type: 'string',
                    format: 'string',
                },
                description: {
                    type: 'string',
                    format: 'string',
                },
                descriptionImages: {
                    type: 'string',
                    format: 'binary',
                },
                specs: {
                    type: 'string',
                    format: 'string',
                },
                specsImages: {
                    type: 'string',
                    format: 'binary',
                },
                detailsDescription: {
                    type: 'string',
                    format: 'string',
                },
                categoryId: {
                    type: 'string',
                    format: 'string',
                },
                type: {
                    type: 'string',
                    format: 'string',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 15 },
        { name: 'descriptionImages', maxCount: 15 },
        { name: 'specsImages', maxCount: 15 },
        { name: 'catalogue', maxCount: 5 },
    ])),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.ProductDTO, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "Create", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/product.entity").Product }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "GetOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'images', maxCount: 5 }])),
    openapi.ApiResponse({ status: 200, type: require("./entities/product.entity").Product }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.UploadedFiles)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.ProductDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "Update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "Delete", null);
ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('api/v1/products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map