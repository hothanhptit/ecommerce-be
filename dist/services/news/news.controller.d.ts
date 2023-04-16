/// <reference types="multer" />
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { News } from './entities/news.entity';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(createNewsDto: CreateNewsDto, file: Express.Multer.File, req: any): Promise<CreateNewsDto & News>;
    findAll(page?: number, limit?: number, orderBy?: string, filter?: string): Promise<Pagination<News>>;
    findRecent(take?: number): Promise<News[]>;
    findCategory(take?: number): Promise<string[]>;
    findOne(id: string): Promise<News>;
    update(id: string, updateNewsDto: UpdateNewsDto, file: Express.Multer.File): Promise<{
        name: string;
        image: string;
        title: string;
        category: string;
        categoryName: string;
        tags: string;
        created_by: string;
        content: string;
        created_at: string;
        updated_at: string;
        id: number;
    } & News>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
