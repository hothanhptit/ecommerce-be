"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNewsDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateNewsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, image_path: { required: true, type: () => String }, title: { required: true, type: () => String }, category: { required: true, type: () => String }, categoryName: { required: true, type: () => String }, tags: { required: true, type: () => String }, created_by: { required: true, type: () => String }, content: { required: true, type: () => String }, created_at: { required: true, type: () => String }, updated_at: { required: true, type: () => String } };
    }
}
exports.CreateNewsDto = CreateNewsDto;
//# sourceMappingURL=create-news.dto.js.map