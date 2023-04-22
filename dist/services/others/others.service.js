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
exports.OthersService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const menu_dto_1 = require("./dto/menu.dto");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
let OthersService = class OthersService {
    constructor(menuRepo) {
        this.menuRepo = menuRepo;
    }
    create(menuDto) {
        if (menuDto.jsonMenu)
            menuDto.jsonMenu = JSON.stringify(menuDto.jsonMenu);
        return this.menuRepo.save(menuDto);
    }
    async findAll() {
        const menu = await this.menuRepo.find();
        if (!menu)
            return new common_1.NotFoundException();
        menu.forEach((element, idx) => {
            menu[idx].jsonMenu = JSON.parse(element.jsonMenu);
        });
        return menu;
    }
    async findOne(id) {
        const menu = await this.menuRepo.findOne({
            where: { id: id },
            cache: true,
        });
        if (!menu)
            throw new common_1.NotFoundException();
        if (!!menu.jsonMenu)
            menu.jsonMenu = JSON.parse(menu.jsonMenu);
        return menu;
    }
    async update(id, menuDto) {
        if (menuDto.jsonMenu)
            menuDto.jsonMenu = JSON.stringify(menuDto.jsonMenu);
        const menu = await this.menuRepo.findOne({ where: { id: id } });
        return this.menuRepo.save(Object.assign(Object.assign({}, menu), menuDto));
    }
    async remove(id) {
        return (await this.menuRepo.delete(id)).affected > 0;
    }
};
OthersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_dto_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OthersService);
exports.OthersService = OthersService;
//# sourceMappingURL=others.service.js.map