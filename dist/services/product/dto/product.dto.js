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
exports.ProductDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProductDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, slug: { required: true, type: () => String }, status: { required: true, type: () => String }, productImages: { required: true, type: () => String }, summary: { required: true, type: () => String }, price: { required: true, type: () => String }, description: { required: true, type: () => String }, descriptionImages: { required: true, type: () => String }, catalogue: { required: true, type: () => String }, specs: { required: true, type: () => String }, specsImages: { required: true, type: () => String }, detailsDescription: { required: true, type: () => String }, categoryId: { required: true, type: () => String }, type: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "summary", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "specs", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "detailsDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "type", void 0);
exports.ProductDTO = ProductDTO;
//# sourceMappingURL=product.dto.js.map