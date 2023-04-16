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
exports.NewsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const news_entity_1 = require("./entities/news.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let NewsService = class NewsService {
    constructor(newsRepo) {
        this.newsRepo = newsRepo;
    }
    create(createNewsDto, file, user) {
        if (user.role == 'admin') {
            if (file) {
                createNewsDto.image = JSON.stringify(process.env.HOST ||
                    'http://localhost:4000/' + file.path.replace('\\', '/'));
            }
            console.log(user);
            createNewsDto.created_by = user.name;
            return this.newsRepo.save(createNewsDto);
        }
        throw new common_1.UnauthorizedException();
    }
    findAll() {
        return this.newsRepo.find();
    }
    async getAll(options, orderBy, filter) {
        const orderDirection = orderBy
            ? { updatedAt: 'DESC' }
            : { updatedAt: 'ASC' };
        const filterCate = filter.split(',');
        const queryBuilder = this.newsRepo
            .createQueryBuilder('news')
            .where('news.category IN (:...category)', { category: filterCate })
            .orderBy('news.updated_at', 'DESC');
        const newsPage = await (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
        if (newsPage) {
            newsPage.items.forEach((item) => {
                item.image = JSON.parse(item.image);
            });
        }
        return newsPage;
    }
    findRecently(number) {
        return this.newsRepo.find({
            take: number,
            order: {
                updated_at: 'DESC',
            },
        });
    }
    async findCategories(number) {
        const data = await this.newsRepo
            .createQueryBuilder('news')
            .select('news.categoryName')
            .addSelect('COUNT(news.categoryName)', 'count')
            .where('news.categoryName is not null')
            .distinct(true)
            .groupBy('news.categoryName')
            .take(number)
            .execute();
        if (!data)
            return [];
        let res = [];
        data.forEach((element) => {
            res.push({ name: element.news_categoryName, count: element.count });
        });
        return res;
    }
    async findOne(id) {
        const item = await this.newsRepo.findOne({
            where: {
                id: id,
            },
        });
        if (!item)
            throw new common_1.NotFoundException();
        item.image = JSON.parse(item.image);
        return item;
    }
    async update(id, updateNewsDto, file) {
        if (file) {
            updateNewsDto.image = file.path;
        }
        const oldData = await this.newsRepo.findOne({
            where: {
                id: id,
            },
            cache: false,
        });
        if (!oldData)
            throw new common_1.NotFoundException();
        return this.newsRepo.save(Object.assign(Object.assign({}, oldData), updateNewsDto));
    }
    remove(id) {
        return this.newsRepo.delete(id);
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(news_entity_1.News)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map