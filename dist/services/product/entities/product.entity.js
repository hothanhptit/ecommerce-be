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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const openapi = require("@nestjs/swagger");
const relatedProduct_entity_1 = require("./relatedProduct.entity");
const typeorm_1 = require("typeorm");
let Product = class Product {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, slug: { required: true, type: () => String }, status: { required: true, type: () => Number }, images: { required: true, type: () => String }, summary: { required: false, type: () => String }, manufacturer: { required: false, type: () => String }, isFeatured: { required: false, type: () => Number }, price: { required: false, type: () => String }, description: { required: false, type: () => String }, descriptionImages: { required: false, type: () => String }, catalogue: { required: false, type: () => String }, specs: { required: false, type: () => String }, specsImages: { required: false, type: () => String }, detailsDescription: { required: false, type: () => String }, categoryId: { required: false, type: () => String }, type: { required: false, type: () => String }, related: { required: true, type: () => [require("./relatedProduct.entity").RelatedProduct] }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "descriptionImages", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "catalogue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "specs", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "specsImages", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "detailsDescription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => relatedProduct_entity_1.RelatedProduct, (related) => related.product),
    __metadata("design:type", Array)
], Product.prototype, "related", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Product.prototype, "updatedAt", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)('prod_id', ['id'])
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map