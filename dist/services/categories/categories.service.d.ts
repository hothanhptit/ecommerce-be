import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private catRepo;
    constructor(catRepo: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto, file: any, user: any): Promise<Category & CreateCategoryDto>;
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto, file: any): Promise<{
        name: string;
        image: string;
        status: number;
        description: string;
        id: number;
        created_at: String;
        updated_at: String;
    } & Category>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
