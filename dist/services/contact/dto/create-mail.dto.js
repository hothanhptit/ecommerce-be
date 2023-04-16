"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMailDTO = void 0;
const openapi = require("@nestjs/swagger");
class CreateMailDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, to_email: { required: true, type: () => String }, to_phonenumber: { required: true, type: () => String }, title: { required: true, type: () => String }, content: { required: true, type: () => String } };
    }
}
exports.CreateMailDTO = CreateMailDTO;
//# sourceMappingURL=create-mail.dto.js.map