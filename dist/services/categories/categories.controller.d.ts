/// <reference types="multer" />
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto, req: any, file: Express.Multer.File): Promise<import("./entities/category.entity").Category & CreateCategoryDto>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: string): Promise<import("./entities/category.entity").Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, file: Express.Multer.File): Promise<{
        name: string;
        image: string;
        status: number;
        children: string;
        description: string;
        id: number;
        created_at: String;
        updated_at: String;
    } & import("./entities/category.entity").Category>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
