import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class NewsService {
    private newsRepo;
    constructor(newsRepo: Repository<News>);
    create(createNewsDto: CreateNewsDto, file: any, user: User): Promise<CreateNewsDto & News>;
    findAll(): Promise<News[]>;
    getAll(options: IPaginationOptions, orderBy: string, filter: string): Promise<Pagination<News>>;
    findRecently(number: number): Promise<News[]>;
    findOne(id: number): Promise<News>;
    update(id: number, updateNewsDto: UpdateNewsDto, file: any): Promise<{
        name: string;
        image_path: string;
        title: string;
        category: string;
        tags: string;
        created_by: string;
        content: string;
        created_at: string;
        updated_at: string;
        id: number;
    } & News>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
