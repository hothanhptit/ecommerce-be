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
exports.ServicesService = void 0;
const log4js_service_1 = require("../log4js/log4js.service");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const services_entity_1 = require("./entities/services.entity");
let ServicesService = class ServicesService {
    constructor(sRepository) {
        this.sRepository = sRepository;
        this.logging = new log4js_service_1.LogServices();
    }
    async create(createBannerDto, file, user) {
        try {
            if (user.role == 'admin') {
                let saveBanner = Object.assign(new services_entity_1.Service(), createBannerDto);
                saveBanner.image = JSON.stringify(file.path.replace('\\', '/'));
                return this.sRepository.save(saveBanner);
            }
            this.logging.getLogger('warning').warn('Unauthorize access: ' + user);
            throw new common_1.UnauthorizedException();
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        const data = await this.sRepository.find({
            order: {
                order: 'ASC',
            },
        });
        if (!data)
            throw new common_1.NotFoundException();
        data.forEach((element, idx) => {
            data[idx].image =
                (process.env.HOST || 'http://localhost:4000') + JSON.parse(element.image);
        });
        return data;
    }
    async findOne(id) {
        const banner = await this.sRepository.findOne({ where: { id: id } });
        return banner;
    }
    async update(id, updateBannerDto, file) {
        const banner = await this.sRepository.findOne({ where: { id: id } });
        if (banner) {
            if (file)
                updateBannerDto.image = JSON.stringify(file.path.replace('\\', '/'));
            return await this.sRepository.save(Object.assign(Object.assign({}, banner), updateBannerDto));
        }
        throw new common_1.NotFoundException();
    }
    async remove(id) {
        const res = await this.sRepository.delete(id);
        if (res.affected)
            return 'ok';
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(services_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map