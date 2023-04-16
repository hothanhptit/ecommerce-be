/// <reference types="multer" />
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateServiceDTO } from './dto/create-services.dto';
import { Service } from './entities/services.entity';
import { UpdateServiceDTO } from './dto/update-sercices.dto';
export declare class ServicesService {
    private sRepository;
    constructor(sRepository: Repository<Service>);
    private logging;
    create(createBannerDto: CreateServiceDTO, file: Express.Multer.File, user: User): Promise<Service & CreateServiceDTO>;
    findAll(): Promise<Service[]>;
    findOne(id: string): Promise<Service | null>;
    update(id: string, updateBannerDto: UpdateServiceDTO, file: Express.Multer.File): Promise<{
        name: string;
        status: number;
        title: string;
        order: number;
        description: string;
        image: string;
        details: string;
        id: string;
        created_at: String;
        updated_at: String;
    } & Service>;
    remove(id: string): Promise<string>;
}
