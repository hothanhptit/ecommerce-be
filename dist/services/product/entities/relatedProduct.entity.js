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
exports.RelatedProduct = void 0;
const openapi = require("@nestjs/swagger");
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("typeorm");
let RelatedProduct = class RelatedProduct {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, productId: { required: false, type: () => String }, name: { required: false, type: () => String }, images: { required: false, type: () => String }, imagesCompress: { required: false, type: () => String }, product: { required: true, type: () => require("./product.entity").Product }, createdAt: { required: true, type: () => Object }, updatedAt: { required: true, type: () => Object } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RelatedProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RelatedProduct.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RelatedProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RelatedProduct.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RelatedProduct.prototype, "imagesCompress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.related, {
        cascade: true,
    }),
    __metadata("design:type", product_entity_1.Product)
], RelatedProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], RelatedProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], RelatedProduct.prototype, "updatedAt", void 0);
RelatedProduct = __decorate([
    (0, typeorm_1.Entity)()
], RelatedProduct);
exports.RelatedProduct = RelatedProduct;
//# sourceMappingURL=relatedProduct.entity.js.map