import { Banner } from './entities/banner.entity';
import { UploadedFile } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
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
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/banner')
@ApiTags('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createBannerDto: CreateBannerDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bannerService.create(createBannerDto, file, req.user);
  }

  @Get()
  async findAll(): Promise<Banner[]> {
    return await this.bannerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Banner> {
    const banner = await this.bannerService.findOne(id);
    if (banner) return banner;
    throw new NotFoundException();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bannerService.update(id, updateBannerDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
