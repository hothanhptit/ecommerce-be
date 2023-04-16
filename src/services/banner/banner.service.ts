import { LogServices } from './../log4js/log4js.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { User } from './../auth/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Repository } from 'typeorm';
import { MainBanner } from './entities/main-banner.entiy';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
    @InjectRepository(MainBanner)
    private mainBannerRepository: Repository<MainBanner>,
  ) {}
  private logging = new LogServices();

  async create(
    createBannerDto: CreateBannerDto,
    file: Express.Multer.File,
    user: User,
  ) {
    if (user.role == 'admin') {
      let saveBanner = Object.assign(new Banner(), createBannerDto);

      saveBanner.image = JSON.stringify(
        process.env.HOST ||
          'http://localhost:4000/' + file.path.replace('\\', '/'),
      );

      return this.bannerRepository.save(saveBanner);
    }
    this.logging.getLogger('warning').warn('Unauthorize access: ' + user);

    throw new UnauthorizedException();
  }

  async createMainBanner(file: Express.Multer.File, user: User) {
    const mainBanner = new MainBanner();
    if (user.role == 'admin') {
      mainBanner.image = JSON.stringify(
        process.env.HOST ||
          'http://localhost:4000/' + file.path.replace('\\', '/'),
      );

      return this.mainBannerRepository.save(mainBanner);
    }
    this.logging.getLogger('warning').warn('Unauthorize access: ' + user);

    throw new UnauthorizedException();
  }
  async getMainBanner() {
    const data = await this.mainBannerRepository.find({
      take: 1,
      order: { id: 'DESC' },
    });
    data[0].image = JSON.parse(data[0].image);
    return data;
  }

  async findAll() {
    const data = await this.bannerRepository.find({
      take: 5,
      order: {
        order: 'ASC',
      },
    });
    if (!data) throw new NotFoundException();
    data.forEach((element, idx) => {
      data[idx].image = JSON.parse(element.image);
    });
    return data;
  }

  async findOne(id: string): Promise<Banner | null> {
    const banner = await this.bannerRepository.findOne({ where: { id: id } });
    banner.image = JSON.parse(banner.image)
    return banner;
  }

  async update(
    id: string,
    updateBannerDto: UpdateBannerDto,
    file: Express.Multer.File,
  ) {
    const banner = await this.bannerRepository.findOne({ where: { id: id } });
    if (banner) {
      if (file)
        updateBannerDto.image = JSON.stringify(
          process.env.HOST ||
            'http://localhost:4000/' + file.path.replace('\\', '/'),
        );
      return await this.bannerRepository.save({
        ...banner,
        ...updateBannerDto,
      });
    }
    throw new NotFoundException();
  }

  async remove(id: string) {
    const res = await this.bannerRepository.delete(id);
    if (res.affected) return 'ok';
  }
}
