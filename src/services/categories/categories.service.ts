import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private catRepo: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, file, user) {
    if (user.role == 'admin') {
      let saveCat = Object.assign(new Category(), createCategoryDto);

      saveCat.image = JSON.stringify(file.path.replace('\\', '/'));

      if (saveCat.parent) {
        const parent = await this.catRepo.findOne({
          where: { id: saveCat.parent },
        });
        if (!parent) throw new BadRequestException();
      }
      return this.catRepo.save(saveCat);
    }

    throw new UnauthorizedException();
  }

  async findAll() {
    const data = await this.catRepo.find({
      where: {
        parent: IsNull(),
      },
    });
    if (!data) throw new NotFoundException();
    for (const [idx, element] of data.entries()) {
      data[idx].image =
        (process.env.HOST || 'http://localhost:4000') +
        JSON.parse(element.image);
      data[idx].children = (await this.findChildrenCat(data[idx].id))[0] as any;
    }
    return data;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
    const queryBuilder = this.catRepo.createQueryBuilder('c');
    queryBuilder.orderBy('c.id', 'DESC'); // Or whatever you need to do
    return paginate<Category>(queryBuilder, options);
  }

  async findOne(id: number) {
    const cat = await this.catRepo.findOne({ where: { id: id } });

    cat.image =
      (process.env.HOST || 'http://localhost:4000') + JSON.parse(cat.image);

    // cat.children = await JSON.parse(cat.children);

    const [childrens] = await this.findChildrenCat(cat.id);

    cat.children = childrens as any;

    return cat;
  }

  // change to migration!!!!
  findChildrenCat = async (
    parentId: number,
  ): Promise<[Category[], number[]]> => {
    const traceId = [parentId];

    const childrens = await this.catRepo.find({
      where: {
        parent: parentId,
      },
    });

    for (const [idx, element] of childrens.entries()) {
      traceId.push(element.id);
      if (element.parent) {
        const child = await this.findChildrenCat(element.id);
        childrens[idx].children = child[0] as any;
      }
    }
    console.log(traceId);

    return [childrens, traceId];
  };

  traceCategory = async (parentId: number): Promise<number[]> => {
    const traceId = [parentId];

    const parent = await this.catRepo.findOne({
      where: {
        id: parentId,
      },
    });
    if (parent.parent) {
      traceId.push(parent.parent);
      this.traceCategory(parent.parent);
    }
    console.log(traceId);

    return traceId;
  };

  async update(id: number, updateCategoryDto: UpdateCategoryDto, file) {
    const banner = await this.catRepo.findOne({ where: { id: id } });
    if (banner) {
      if (file)
        updateCategoryDto.image = JSON.stringify(file.path.replace('\\', '/'));
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
