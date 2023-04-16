/// <reference types="multer" />
import { Banner } from './entities/banner.entity';
import { User } from './../auth/entities/user.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Repository } from 'typeorm';
export declare class BannerService {
    private bannerRepository;
    constructor(bannerRepository: Repository<Banner>);
    private logging;
    create(createBannerDto: CreateBannerDto, file: Express.Multer.File, user: User): Promise<Banner & CreateBannerDto>;
    findAll(): Promise<Banner[]>;
    findOne(id: string): Promise<Banner | null>;
    update(id: string, updateBannerDto: UpdateBannerDto, file: Express.Multer.File): Promise<{
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
    } & Banner>;
    remove(id: string): Promise<string>;
}
