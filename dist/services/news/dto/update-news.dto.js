"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNewsDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_news_dto_1 = require("./create-news.dto");
class UpdateNewsDto extends (0, mapped_types_1.PartialType)(create_news_dto_1.CreateNewsDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateNewsDto = UpdateNewsDto;
//# sourceMappingURL=update-news.dto.js.map