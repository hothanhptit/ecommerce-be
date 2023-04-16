import { CreateContactDto } from './dto/create-contact.dto';
import { Mail } from './entities/mail.entity';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Repository } from 'typeorm';
import { LogServices } from './../log4js/log4js.service';
import { ContactService } from './contact.service';
import { CreateMailDTO } from './dto/create-mail.dto';
import { Contact } from './entities/contact.entity';
export declare class ContactController {
    private readonly contactService;
    private contactRepo;
    private mailRepo;
    constructor(contactService: ContactService, contactRepo: Repository<Contact>, mailRepo: Repository<Mail>);
    logger: LogServices;
    create(mailDTO: CreateMailDTO): Promise<string>;
    findAll(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<Mail, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    createContact(contactDTO: CreateContactDto): Promise<CreateContactDto & Contact>;
    findOne(): Promise<Contact>;
    update(id: string, updateContactDto: UpdateContactDto): Promise<Contact[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
