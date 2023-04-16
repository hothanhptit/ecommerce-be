"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModule = void 0;
const banner_entity_1 = require("./entities/banner.entity");
const typeorm_1 = require("@nestjs/typeorm");
const multer_config_1 = require("./../../config/multer.config");
const multer_1 = require("@nestjs/platform-express/multer");
const common_1 = require("@nestjs/common");
const banner_service_1 = require("./banner.service");
const banner_controller_1 = require("./banner.controller");
let BannerModule = class BannerModule {
};
BannerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([banner_entity_1.Banner]),
            multer_1.MulterModule.register(multer_config_1.multerOptions),
        ],
        controllers: [banner_controller_1.BannerController],
        providers: [banner_service_1.BannerService],
    })
], BannerModule);
exports.BannerModule = BannerModule;
//# sourceMappingURL=banner.module.js.map