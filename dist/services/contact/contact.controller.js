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
exports.ContactController = void 0;
const openapi = require("@nestjs/swagger");
const create_contact_dto_1 = require("./dto/create-contact.dto");
const paginate_1 = require("nestjs-typeorm-paginate/dist/paginate");
const mail_entity_1 = require("./entities/mail.entity");
const update_contact_dto_1 = require("./dto/update-contact.dto");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const log4js_service_1 = require("./../log4js/log4js.service");
const common_1 = require("@nestjs/common");
const contact_service_1 = require("./contact.service");
const create_mail_dto_1 = require("./dto/create-mail.dto");
const contact_entity_1 = require("./entities/contact.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const nodemailer = require('nodemailer');
let ContactController = class ContactController {
    constructor(contactService, contactRepo, mailRepo) {
        this.contactService = contactService;
        this.contactRepo = contactRepo;
        this.mailRepo = mailRepo;
        this.logger = new log4js_service_1.LogServices();
    }
    async create(mailDTO) {
        if (!mailDTO.to_email && !mailDTO.to_phonenumber)
            throw new common_1.BadRequestException();
        const mailOptions = {
            from: 'dinh@thietbihoboi.store',
            to: mailDTO.to_email,
            subject: mailDTO.title,
            text: mailDTO.content,
        };
        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            secure: true,
            secureConnection: false,
            tls: {
                ciphers: 'SSLv3',
            },
            requireTLS: true,
            port: 465,
            debug: true,
            auth: {
                user: 'dinh@thietbihoboi.store',
                pass: process.env.MAIL_PASSWORD || '"APeE!V2LP#" ',
            },
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                this.logger.getLogger('debug').debug(error);
                throw new common_1.ServiceUnavailableException();
            }
            else {
                this.logger.getLogger('debug').debug(info);
                console.log(info);
            }
        });
        this.mailRepo.save(mailDTO);
        return `Mail sent to ${mailDTO.to_email}!`;
    }
    findAll(page = 1, limit = 10) {
        return (0, paginate_1.paginate)(this.mailRepo, {
            page,
            limit,
            route: (process.env.HOST || 'http://localhost:4000') +
                '/api/v1/contact/mail',
        }, {
            order: {
                createdAt: 'DESC',
            },
            cache: false,
        });
    }
    async createContact(contactDTO) {
        return this.contactService.create(contactDTO);
    }
    async findOne() {
        return await this.contactService.findOne();
    }
    async update(id, updateContactDto) {
        return await this.contactService.update(+id, updateContactDto);
    }
    async remove(id) {
        return await this.contactService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('/inbox'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mail_dto_1.CreateMailDTO]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/inbox'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(16), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "createContact", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./entities/contact.entity").Contact }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/contact.entity").Contact] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_dto_1.UpdateContactDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "remove", null);
ContactController = __decorate([
    (0, common_1.Controller)('/api/v1/contact'),
    (0, swagger_1.ApiTags)('contact'),
    __param(1, (0, typeorm_2.InjectRepository)(contact_entity_1.Contact)),
    __param(2, (0, typeorm_2.InjectRepository)(mail_entity_1.Mail)),
    __metadata("design:paramtypes", [contact_service_1.ContactService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ContactController);
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map