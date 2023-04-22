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
exports.OthersController = void 0;
const openapi = require("@nestjs/swagger");
const update_menu_dto_1 = require("./dto/update-menu.dto");
const menu_dto_1 = require("./dto/menu.dto");
const dist_1 = require("@nestjs/swagger/dist");
const common_1 = require("@nestjs/common");
const others_service_1 = require("./others.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let OthersController = class OthersController {
    constructor(othersService) {
        this.othersService = othersService;
    }
    create(menuDto) {
        return this.othersService.create(menuDto);
    }
    findAll() {
        return this.othersService.findAll();
    }
    findOne(id) {
        return this.othersService.findOne(+id);
    }
    update(id, menuDto) {
        return this.othersService.update(+id, menuDto);
    }
    remove(id) {
        return this.othersService.remove(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/menu'),
    openapi.ApiResponse({ status: 201, type: require("./dto/menu.dto").Menu }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.Menu]),
    __metadata("design:returntype", void 0)
], OthersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/menu'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OthersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/menu/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/menu.dto").Menu }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OthersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/menu/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", void 0)
], OthersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/menu/:id'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OthersController.prototype, "remove", null);
OthersController = __decorate([
    (0, common_1.Controller)('api/v1/others'),
    (0, dist_1.ApiTags)('others'),
    __metadata("design:paramtypes", [others_service_1.OthersService])
], OthersController);
exports.OthersController = OthersController;
//# sourceMappingURL=others.controller.js.map