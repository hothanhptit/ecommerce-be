import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class CategoriesService {
    private catRepo;
    constructor(catRepo: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto, file: any, user: any): Promise<Category & CreateCategoryDto>;
    findAll(): Promise<Category[]>;
    paginate(options: IPaginationOptions): Promise<Pagination<Category>>;
    findOne(id: number): Promise<Category>;
    findChildrenCat: (parentId: number) => Promise<[Category[], number[]]>;
    traceCategory: (parentId: number) => Promise<number[]>;
    update(id: number, updateCategoryDto: UpdateCategoryDto, file: any): Promise<{
        name: string;
        image: string;
        status: number;
        children: string;
        description: string;
        id: number;
        parent: number;
        created_at: String;
        updated_at: String;
    } & Category>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
