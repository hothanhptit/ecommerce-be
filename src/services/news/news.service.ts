import { removeVietnameseTones } from 'src/utils/fn';
import { filter } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepo: Repository<News>,
  ) {}
  create(createNewsDto: CreateNewsDto, file: any, user: User) {
    if (user.role == 'admin') {
      if (file) {
        createNewsDto.image = JSON.stringify(file.path.replace('\\', '/'));
      }
      createNewsDto.created_by = user.name;
      createNewsDto.slug = removeVietnameseTones(createNewsDto.name);
      
      return this.newsRepo.save(createNewsDto);
    }
    throw new UnauthorizedException();
  }

  findAll() {
    return this.newsRepo.find();
  }
  async getAll(
    options: IPaginationOptions,
    orderBy: string,
    category: string,
    filter: string,
  ): Promise<Pagination<News>> {
    // if (filter) return this.searchProducts(options, orderBy, filter);
    const orderDirection = orderBy
      ? { updatedAt: 'DESC' }
      : { updatedAt: 'ASC' };

    const filterCategory = category.split(',');
    const queryBuilder = this.newsRepo
      .createQueryBuilder('news')
      .where('news.category IN (:...category)', { category: filterCategory })
      .andWhere('news.categoryName like :categoryName', {
        categoryName: `%${filter}%`,
      })
      .orWhere('news.slug like :slug', { slug: `%${filter}%` })
      .orderBy('news.updated_at', 'DESC');
    // .cache('product', 30 * 1000);

    const newsPage = await paginate<News>(queryBuilder, options);
    if (newsPage) {
      newsPage.items.forEach((item) => {
        item.image =
          (process.env.HOST || 'http://localhost:4000') +
          JSON.parse(item.image);
      });
    }
    return newsPage;
  }
  findRecently(number: number) {
    return this.newsRepo.find({
      take: number,
      order: {
        updated_at: 'DESC',
      },
    });
  }
  async findCategories(number: number) {
    const data = await this.newsRepo
      .createQueryBuilder('news')
      .select('news.categoryName')
      .addSelect('COUNT(news.categoryName)', 'count')
      .where('news.categoryName is not null')
      .distinct(true)
      .groupBy('news.categoryName')
      .take(number)
      .cache(false)
      .execute();

    if (!data) return [];
    let res = [];

    data.forEach((element) => {
      res.push({ name: element.news_categoryName, count: element.count });
    });

    return res;
  }

  async findOne(id: number) {
    const item = await this.newsRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!item) throw new NotFoundException();
    item.image =
      (process.env.HOST || 'http://localhost:4000') + JSON.parse(item.image);
    return item;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto, file: any) {
    if (file) {
      updateNewsDto.image = file.path;
    }
    const oldData = await this.newsRepo.findOne({
      where: {
        id: id,
      },
      cache: false,
    });
    if (!oldData) throw new NotFoundException();

    updateNewsDto.slug = removeVietnameseTones(updateNewsDto.name);

    return this.newsRepo.save({ ...oldData, ...updateNewsDto });
  }

  remove(id: number) {
    return this.newsRepo.delete(id);
  }
}
