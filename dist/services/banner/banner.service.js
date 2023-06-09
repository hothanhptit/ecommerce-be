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
exports.BannerService = void 0;
const log4js_service_1 = require("./../log4js/log4js.service");
const typeorm_1 = require("@nestjs/typeorm");
const banner_entity_1 = require("./entities/banner.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
let BannerService = class BannerService {
    constructor(bannerRepository) {
        this.bannerRepository = bannerRepository;
        this.logging = new log4js_service_1.LogServices();
    }
    async create(createBannerDto, file, user) {
        if (user.role == 'admin') {
            let saveBanner = Object.assign(new banner_entity_1.Banner(), createBannerDto);
            saveBanner.image = JSON.stringify(process.env.HOST ||
                'http://localhost:4000/' + file.path.replace('\\', '/'));
            return this.bannerRepository.save(saveBanner);
        }
        this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
        throw new common_1.UnauthorizedException();
    }
    async findAll() {
        return await this.bannerRepository.find({
            take: 5,
            order: {
                order: 'ASC',
            },
        });
    }
    async findOne(id) {
        const banner = await this.bannerRepository.findOne({ where: { id: id } });
        return banner;
    }
    async update(id, updateBannerDto, file) {
        const banner = await this.bannerRepository.findOne({ where: { id: id } });
        if (banner) {
            if (file)
                updateBannerDto.image = JSON.stringify(process.env.HOST ||
                    'http://localhost:4000/' + file.path.replace('\\', '/'));
            return await this.bannerRepository.save(Object.assign(Object.assign({}, banner), updateBannerDto));
        }
        throw new common_1.NotFoundException();
    }
    async remove(id) {
        const res = await this.bannerRepository.delete(id);
        if (res.affected)
            return 'ok';
    }
};
BannerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(banner_entity_1.Banner)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BannerService);
exports.BannerService = BannerService;
//# sourceMappingURL=banner.service.js.map