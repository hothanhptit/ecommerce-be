"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contact_dto_1 = require("./create-contact.dto");
class UpdateContactDto extends (0, mapped_types_1.PartialType)(create_contact_dto_1.CreateContactDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateContactDto = UpdateContactDto;
//# sourceMappingURL=update-contact.dto.js.map