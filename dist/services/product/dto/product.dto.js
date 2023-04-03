"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDTO = void 0;
const openapi = require("@nestjs/swagger");
class ProductDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, productImages: { required: true, type: () => String }, summary: { required: true, type: () => String }, price: { required: true, type: () => String }, description: { required: true, type: () => String }, descriptionImages: { required: true, type: () => String }, catalogue: { required: true, type: () => String }, specs: { required: true, type: () => String }, specsImages: { required: true, type: () => String }, detailsDescription: { required: true, type: () => String }, categoryId: { required: true, type: () => String }, type: { required: true, type: () => String } };
    }
}
exports.ProductDTO = ProductDTO;
//# sourceMappingURL=product.dto.js.map