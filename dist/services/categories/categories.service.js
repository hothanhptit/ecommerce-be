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
exports.CategoriesService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
let CategoriesService = class CategoriesService {
    constructor(catRepo) {
        this.catRepo = catRepo;
    }
    create(createCategoryDto, file, user) {
        if (user.role == 'admin') {
            let saveCat = Object.assign(new category_entity_1.Category(), createCategoryDto);
            saveCat.image = JSON.stringify(process.env.HOST ||
                'http://localhost:4000/' + file.path.replace('\\', '/'));
            saveCat.children = JSON.stringify(saveCat.children);
            return this.catRepo.save(saveCat);
        }
        throw new common_1.UnauthorizedException();
    }
    async findAll() {
        const data = await this.catRepo.find();
        if (!data)
            throw new common_1.NotFoundException();
        data.forEach((element, idx) => {
            data[idx].image = JSON.parse(element.image);
            data[idx].children = JSON.parse(element.children);
        });
        return data;
    }
    async findOne(id) {
        const cat = await this.catRepo.findOne({ where: { id: id } });
        cat.image = JSON.parse(cat.image);
        cat.children = JSON.parse(cat.children);
        return cat;
    }
    async update(id, updateCategoryDto, file) {
        const banner = await this.catRepo.findOne({ where: { id: id } });
        if (banner) {
            if (file)
                updateCategoryDto.image = JSON.stringify(process.env.HOST ||
                    'http://localhost:4000/' + file.path.replace('\\', '/'));
            return await this.catRepo.save(Object.assign(Object.assign({}, banner), updateCategoryDto));
        }
        throw new common_1.NotFoundException();
    }
    remove(id) {
        return this.catRepo.delete(id);
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map