import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private catRepo: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto, file, user) {
    if (user.role == 'admin') {
      let saveCat = Object.assign(new Category(), createCategoryDto);

      saveCat.image = JSON.stringify(
        process.env.HOST ||
          'http://localhost:4000/' + file.path.replace('\\', '/'),
      );

      saveCat.children = JSON.stringify(saveCat.children);

      return this.catRepo.save(saveCat);
    }
    throw new UnauthorizedException();
  }

  async findAll() {
    const data = await this.catRepo.find();
    if (!data) throw new NotFoundException();
    data.forEach((element, idx) => {
      data[idx].image = JSON.parse(element.image);
      data[idx].children = JSON.parse(element.children);

    });
    return data;
  }

  async findOne(id: number) {
    const cat = await this.catRepo.findOne({ where: { id: id } });
    cat.image = JSON.parse(cat.image);
    cat.children = JSON.parse(cat.children)
    return cat;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, file) {
    const banner = await this.catRepo.findOne({ where: { id: id } });
    if (banner) {
      if (file)
        updateCategoryDto.image = JSON.stringify(
          process.env.HOST ||
            'http://localhost:4000/' + file.path.replace('\\', '/'),
        );
      return await this.catRepo.save({
        ...banner,
        ...updateCategoryDto,
      });
    }
    throw new NotFoundException();
  }

  remove(id: number) {
    return this.catRepo.delete(id);
  }
}
