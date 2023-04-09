import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepo: Repository<News>,
  ) {}
  create(createNewsDto: CreateNewsDto, file: any) {
    if (file) {
      createNewsDto.image_path = file.path;
    }
    return this.newsRepo.save(createNewsDto);
  }

  findAll() {
    return this.newsRepo.find();
  }

  findOne(id: number) {
    return this.newsRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto, file: any) {
    if (file) {
      updateNewsDto.image_path = file.path;
    }
    const oldData = await this.newsRepo.findOne({
      where: {
        id: id,
      },
      cache: false,
    });
    if (!oldData) throw new NotFoundException();

    return this.newsRepo.save({ ...oldData, ...updateNewsDto });
  }

  remove(id: number) {
    return this.newsRepo.delete(id);
  }
}
