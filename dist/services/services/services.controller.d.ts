/// <reference types="multer" />
import { Service } from './entities/services.entity';
import { CreateServiceDTO } from './dto/create-services.dto';
import { ServicesService } from './services.service';
import { UpdateServiceDTO } from './dto/update-sercices.dto';
export declare class ServicesController {
    private readonly sService;
    constructor(sService: ServicesService);
    create(createServiceDto: CreateServiceDTO, req: any, file: Express.Multer.File): Promise<Service & CreateServiceDTO>;
    findAll(): Promise<Service[]>;
    findOne(id: string): Promise<Service>;
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
