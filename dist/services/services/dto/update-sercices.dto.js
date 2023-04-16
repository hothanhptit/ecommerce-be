"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceDTO = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_services_dto_1 = require("./create-services.dto");
class UpdateServiceDTO extends (0, mapped_types_1.PartialType)(create_services_dto_1.CreateServiceDTO) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateServiceDTO = UpdateServiceDTO;
//# sourceMappingURL=update-sercices.dto.js.map