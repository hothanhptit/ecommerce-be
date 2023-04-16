"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("@nestjs/platform-express/multer");
const typeorm_1 = require("@nestjs/typeorm");
const multer_config_1 = require("../../config/multer.config");
const services_entity_1 = require("./entities/services.entity");
const services_controller_1 = require("./services.controller");
const services_service_1 = require("./services.service");
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([services_entity_1.Service]),
            multer_1.MulterModule.register(multer_config_1.multerOptions),
        ],
        controllers: [services_controller_1.ServicesController],
        providers: [services_service_1.ServicesService],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=services.module.js.map