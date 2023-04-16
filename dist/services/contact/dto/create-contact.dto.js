"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateContactDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { address: { required: true, type: () => String }, phone: { required: true, type: () => String }, work_time: { required: true, type: () => String } };
    }
}
exports.CreateContactDto = CreateContactDto;
//# sourceMappingURL=create-contact.dto.js.map