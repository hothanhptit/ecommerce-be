"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModule = void 0;
const multer_config_1 = require("./../../config/multer.config");
const multer_1 = require("@nestjs/platform-express/multer");
const typeorm_1 = require("@nestjs/typeorm");
const news_entity_1 = require("./entities/news.entity");
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
const news_controller_1 = require("./news.controller");
let NewsModule = class NewsModule {
};
NewsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([news_entity_1.News]),
            multer_1.MulterModule.register(multer_config_1.multerOptions),
        ],
        controllers: [news_controller_1.NewsController],
        providers: [news_service_1.NewsService],
    })
], NewsModule);
exports.NewsModule = NewsModule;
//# sourceMappingURL=news.module.js.map