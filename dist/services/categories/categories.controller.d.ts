/// <reference types="multer" />
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from './entities/category.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto, req: any, file: Express.Multer.File): Promise<Category & CreateCategoryDto>;
    findAll(): Promise<Category[]>;
    index(page?: number, limit?: number): Promise<Pagination<Category>>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, file: Express.Multer.File): Promise<{
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
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
