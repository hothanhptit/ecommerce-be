"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMenuDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const menu_dto_1 = require("./menu.dto");
class UpdateMenuDto extends (0, mapped_types_1.PartialType)(menu_dto_1.Menu) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateMenuDto = UpdateMenuDto;
//# sourceMappingURL=update-menu.dto.js.map