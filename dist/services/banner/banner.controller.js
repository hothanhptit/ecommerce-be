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
exports.BannerController = void 0;
const openapi = require("@nestjs/swagger");
const decorators_1 = require("@nestjs/common/decorators");
const jwt_auth_guard_1 = require("./../auth/jwt-auth.guard");
const dist_1 = require("@nestjs/swagger/dist");
const common_1 = require("@nestjs/common");
const banner_service_1 = require("./banner.service");
const create_banner_dto_1 = require("./dto/create-banner.dto");
const update_banner_dto_1 = require("./dto/update-banner.dto");
const platform_express_1 = require("@nestjs/platform-express");
let BannerController = class BannerController {
    constructor(bannerService) {
        this.bannerService = bannerService;
    }
    create(createBannerDto, req, file) {
        return this.bannerService.create(createBannerDto, file, req.user);
    }
    async findAll() {
        return await this.bannerService.findAll();
    }
    async findOne(id) {
        const banner = await this.bannerService.findOne(id);
        if (banner)
            return banner;
        throw new common_1.NotFoundException();
    }
    update(id, updateBannerDto, file) {
        return this.bannerService.update(id, updateBannerDto, file);
    }
    remove(id) {
        return this.bannerService.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, decorators_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_dto_1.CreateBannerDto, Object, Object]),
    __metadata("design:returntype", void 0)
], BannerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/banner.entity").Banner] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/banner.entity").Banner }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_banner_dto_1.UpdateBannerDto, Object]),
    __metadata("design:returntype", void 0)
], BannerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BannerController.prototype, "remove", null);
BannerController = __decorate([
    (0, common_1.Controller)('api/v1/banner'),
    (0, dist_1.ApiTags)('banner'),
    __metadata("design:paramtypes", [banner_service_1.BannerService])
], BannerController);
exports.BannerController = BannerController;
//# sourceMappingURL=banner.controller.js.map