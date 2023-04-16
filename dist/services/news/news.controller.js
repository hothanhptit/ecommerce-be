"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const openapi = require("@nestjs/swagger");
const decorators_1 = require("@nestjs/common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const dist_1 = require("@nestjs/swagger/dist");
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
const create_news_dto_1 = require("./dto/create-news.dto");
const update_news_dto_1 = require("./dto/update-news.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    create(createNewsDto, file, req) {
        return this.newsService.create(createNewsDto, file, req.user);
    }
    async findAll(page = 1, limit = 16, orderBy = 'created_at', filter = '1,2') {
        limit = limit > 100 ? 100 : limit;
        return await this.newsService.getAll({
            page,
            limit,
            route: process.env.host || 'http://localhost:4000' + '/api/v1/products',
        }, orderBy, filter);
    }
    findRecent(take = 5) {
        return this.newsService.findRecently(take);
    }
    findOne(id) {
        return this.newsService.findOne(+id);
    }
    update(id, updateNewsDto, file) {
        return this.newsService.update(+id, updateNewsDto, file);
    }
    remove(id) {
        return this.newsService.remove(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_news_dto_1.CreateNewsDto, Object, Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(16), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('orderBy')),
    __param(3, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/recently'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/news.entity").News] }),
    __param(0, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "findRecent", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/news.entity").News }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_news_dto_1.UpdateNewsDto, Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "remove", null);
NewsController = __decorate([
    (0, dist_1.ApiTags)('news'),
    (0, common_1.Controller)('api/v1/news'),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map