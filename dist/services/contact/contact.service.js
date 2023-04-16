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
exports.ContactService = void 0;
const contact_entity_1 = require("./entities/contact.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ContactService = class ContactService {
    constructor(contactRepo) {
        this.contactRepo = contactRepo;
    }
    create(createContactDto) {
        createContactDto.address = JSON.stringify(createContactDto.address);
        createContactDto.phone = JSON.stringify(createContactDto.phone);
        createContactDto.work_time = JSON.stringify(createContactDto.work_time);
        return this.contactRepo.save(createContactDto);
    }
    async findAll() {
        const contact = await this.contactRepo.find();
        if (!contact)
            throw new common_1.NotFoundException();
        console.log(contact);
        contact.forEach((element, id) => {
            contact[id].address = JSON.parse(element.address);
            contact[id].phone = JSON.parse(element.phone);
            contact[id].work_time = JSON.parse(element.work_time);
        });
        return contact;
    }
    async findOne() {
        const contact = await this.contactRepo.findOne({
            where: {
                id: 1,
            },
            cache: false,
        });
        if (!contact)
            throw new common_1.NotFoundException();
        contact.address = JSON.parse(contact.address);
        contact.phone = JSON.parse(contact.phone);
        contact.work_time = JSON.parse(contact.work_time);
        return contact;
    }
    async update(id, updateContactDto) {
        const oldContact = await this.contactRepo.find({
            where: {
                id: 1,
            },
            cache: false,
        });
        if (!oldContact)
            throw new common_1.NotFoundException();
        updateContactDto.address = JSON.stringify(updateContactDto.address);
        updateContactDto.phone = JSON.stringify(updateContactDto.phone);
        updateContactDto.work_time = JSON.stringify(updateContactDto.work_time);
        return this.contactRepo.save(Object.assign(Object.assign({}, oldContact), updateContactDto));
    }
    remove(id) {
        return this.contactRepo.delete(id);
    }
};
ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map