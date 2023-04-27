/// <reference types="multer" />
import { Banner } from './entities/banner.entity';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    create(createBannerDto: CreateBannerDto, req: any, file: Express.Multer.File): Promise<Banner & CreateBannerDto>;
    findAll(): Promise<Banner[]>;
    getMainbanner(): Promise<import("./entities/main-banner.entiy").MainBanner[]>;
    createMainBanner(req: any, file: Express.Multer.File): Promise<import("./entities/main-banner.entiy").MainBanner>;
    getWhyUs(): Promise<import("./entities/main-banner.entiy").MainBanner[]>;
    createWhyUs(req: any, file: Express.Multer.File): Promise<import("./entities/main-banner.entiy").MainBanner>;
    findOne(id: string): Promise<Banner>;
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
