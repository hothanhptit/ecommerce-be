import { Service } from './entities/services.entity';
import { UploadedFile } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateServiceDTO } from './dto/create-services.dto';
import { ServicesService } from './services.service';
import { UpdateServiceDTO } from './dto/update-sercices.dto';

@Controller('api/v1/services')
@ApiTags('services')
export class ServicesController {
  constructor(private readonly sService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createBannerDto: CreateServiceDTO,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.sService.create(createBannerDto, file, req.user);
  }

  @Get()
  async findAll(): Promise<Service[]> {
    return await this.sService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service> {
    const banner = await this.sService.findOne(id);
    if (banner) return banner;
    throw new NotFoundException();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateServiceDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.sService.update(id, updateBannerDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sService.remove(id);
  }
}
