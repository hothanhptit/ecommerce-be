import { CreateContactDto } from './dto/create-contact.dto';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';
import { Mail } from './entities/mail.entity';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogServices } from './../log4js/log4js.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
  Request,
  BadRequestException,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateMailDTO } from './dto/create-mail.dto';
import { Contact } from './entities/contact.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
const nodemailer = require('nodemailer');

@Controller('/api/v1/contact')
@ApiTags('contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
    @InjectRepository(Mail)
    private mailRepo: Repository<Mail>,
  ) {}

  logger = new LogServices();

  @Post('/inbox')
  async create(@Body() mailDTO: CreateMailDTO) {
    if (!mailDTO.to_email && !mailDTO.to_phonenumber)
      throw new BadRequestException();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'thanhh8nt@gmail.com',
        pass: 'pjjuhkhzgghjybba',
      },
    });

    const mailOptions = {
      from: 'thanhh8nt@gmail.com',
      to: mailDTO.to_email,
      subject: mailDTO.title,
      text: mailDTO.content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        this.logger.getLogger('debug').debug(error);
        throw new ServiceUnavailableException();
      } else {
        this.logger.getLogger('debug').debug(info);
      }
    });
    this.mailRepo.save(mailDTO);
    return `Mail sent to ${mailDTO.to_email}!`;
  }
  @UseGuards(JwtAuthGuard)
  @Get('/inbox')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(16), ParseIntPipe) limit: number = 10,
  ) {
    return paginate<Mail>(
      this.mailRepo,
      {
        page,
        limit,
        route:
          (process.env.HOST || 'http://localhost:4000') + '/api/v1/contact/mail',
      },
      {
        order: {
          createdAt: 'DESC',
        },
        cache: false,
      },
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createContact(@Body() contactDTO: CreateContactDto) {
    return this.contactService.create(contactDTO);
  }

  @Get()
  async findOne() {
    return await this.contactService.findOne();
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.contactService.update(+id, updateContactDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.contactService.remove(+id);
  }
}
