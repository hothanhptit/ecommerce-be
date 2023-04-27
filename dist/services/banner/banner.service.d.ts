/// <reference types="multer" />
import { Banner } from './entities/banner.entity';
import { User } from './../auth/entities/user.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Repository } from 'typeorm';
import { MainBanner } from './entities/main-banner.entiy';
export declare class BannerService {
    private bannerRepository;
    private mainBannerRepository;
    constructor(bannerRepository: Repository<Banner>, mainBannerRepository: Repository<MainBanner>);
    private logging;
    create(createBannerDto: CreateBannerDto, file: Express.Multer.File, user: User): Promise<Banner & CreateBannerDto>;
    createMainBanner(file: Express.Multer.File, user: User): Promise<MainBanner>;
    createWhyUs(file: Express.Multer.File, user: User): Promise<MainBanner>;
    getWhyUs(): Promise<MainBanner[]>;
    getMainBanner(): Promise<MainBanner[]>;
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
